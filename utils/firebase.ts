import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, doc, getDoc, getDocs, updateDoc, deleteDoc, query, where, setDoc } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import moment from "moment";
import * as keys from "../configs/keys"

const firebaseConfig = {
  apiKey: keys.FIREBASE.apiKey,
  authDomain: keys.FIREBASE.authDomain,
  projectId: keys.FIREBASE.projectId,
  storageBucket: keys.FIREBASE.storageBucket,
  messagingSenderId: keys.FIREBASE.messagingSenderId,
  appId: keys.FIREBASE.appId,
};

let store:any
setTimeout(() => {
  store = useStore();
},500);

// Inicializar la app de Firebase
const app = initializeApp(firebaseConfig);

// Obtener una instancia de Firestore
const firestore = getFirestore(app);

// Obtiene una instancia del objeto de autenticación de Firebase
const auth = getAuth();

export const firebase = {
  getData: async ({ rute = "" }) => {
    const querySnapshot = await getDocs(collection(firestore, rute));
    const data:any = [];
    querySnapshot.forEach((doc) => {
      data.push({
        ...doc.data(),
        id: doc.id,
      });
    });

    return data;
  },

  getOne: async ({ rute = "", id = "" }) => {
    const documentoRef = doc(firestore, rute, id);
    const documentoSnapshot = await getDoc(documentoRef);
    let data = null;
    if (documentoSnapshot.exists()) {
      data = {
        ...documentoSnapshot.data(),
        id,
      };
    } else {
      console.log(`El documento con el ID: ${id}, no existe`);
    }

    return data;
  },

  create: async ({ rute = "", data = {} }) => {
    const docRef = await addDoc(collection(firestore, rute), {
      ...data,
      created_at: moment().toISOString(),
    });

    const documentCreated = await firebase.getOne({ rute, id: docRef.id });
    return documentCreated;
  },

  createWithIdEspecific:async ({rute="", id="", data={}}) => {
    await setDoc(doc(firestore, rute, id), {
      ...data,
      created_at: moment().toISOString(),
    });

    const documentCreated = await firebase.getOne({ rute, id });
    return documentCreated;
  },

  update: async ({ rute = "", id = "", data = {} }) => {
    const documentoRef = doc(firestore, rute, id);
    await updateDoc(documentoRef, {
      ...data,
      updated_at: moment().toISOString(),
    });

    const documentUpdated = await firebase.getOne({ rute, id });
    return documentUpdated;
  },

  remove: async ({ rute = "", id = "" }) => {
    const documentRemove = await firebase.getOne({ rute, id });

    const documentoRef = doc(firestore, rute, id);
    await deleteDoc(documentoRef);

    return documentRemove;
  },

  logout: async () => {
    const logout = await signOut(auth);
    return logout;
  },

  loginWithGoogle: async () => {
    const res = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, res);
    return result;
  },

  isLoged: async () => {
    let loged = false;
    await onAuthStateChanged(auth, (user:any)  => {
      if (user) {
        user.photoURL = user.photoURL.split('=')[0]
        store.setUser({data:user});
        loged = user
        firebase.registerLastVisitUser({userData: user})
      } else {
        store.setUser({data:null});
      }
    });

    return loged;
  },

  getWhereMethodAnd: async ({rute="", wheres=[]}) => {
    const usersRef = collection(firestore, rute);
    let q = query(usersRef);

    wheres.forEach(where__ => {
      const column = where__[0];
      const condition = where__[1];
      const word = where__[2];

      q = query(q, where(column, condition, word))
    })

    const querySnapshot = await getDocs(q);

    const data: any = [];
    querySnapshot.forEach((doc) => {
      data.push({id: doc.id, ...doc.data()});
    });

    return data;
  },

  transformDateGoogle: (unixDate:any) => {
    const tiempoEnMilisegundos = parseInt(`${unixDate}`);
    const fecha = new Date(tiempoEnMilisegundos);
    return fecha.toISOString();
  },

  registerLastVisitUser: async ({userData = null}: any) => {
    if(!userData){
      return {message: "user not logged"}
    }

    const rute = "users";
    const lastVisited = moment().toISOString()
    const data = {
      user_uid: userData?.uid,
      email: userData?.email,
      displayName: userData?.displayName,
      photoURL: userData?.photoURL,
      created_at: firebase.transformDateGoogle(userData?.metadata?.createdAt),
      last_login_at: firebase.transformDateGoogle(userData?.metadata?.lastLoginAt),
      last_visited_at: lastVisited,
    }

    const existDocument = await firebase.getOne({rute, id: data.email});
    if(existDocument){
      await firebase.update({rute, id: data.email, data})
    }else{
      await firebase.createWithIdEspecific({rute, id: data.email, data})
    }

    return {message: "success"}
  }
}

export const getTotalStars = async () => {
  const data:any = await firebase.getOne({rute:"stars", id:"total-stars"});
  const total = data?.total || 0
  store.setEsrellas(total);
  return total;
}