import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, doc, getDoc, getDocs, updateDoc, deleteDoc, query, where, setDoc } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
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

const storage = getStorage();
const metadata = {
  contentType: 'image/jpeg'
};

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
  },

  uploadFiles: async (file:any, path="images") => {
    const fechaActualUnix = Math.floor(Date.now() / 1000);
    const rute = `${path}/${fechaActualUnix}`
    const storageRef = ref(storage, rute);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    return new Promise((resolve, reject) => {
      uploadTask.on('state_changed', (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;

          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      async () => {
        // Upload completed successfully, now we can get the download URL
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log('File available at', downloadURL);
          resolve(downloadURL);
        } catch (error) {
          reject(error);
        }
      })
    })
  }
}

export const getTotalStars = async () => {
  const data:any = await firebase.getOne({rute:"stars", id:"total-stars"});
  const total = data?.total || 0
  store.setEstrellas(total);
  return total;
}

export const unLessStars = async (quantity: any) => {
  const data:any = await firebase.getOne({rute:"stars", id:"total-stars"});
  const total = data?.total || 0
  const newTotal = total - parseInt(`${quantity}`);
  const updated = await firebase.createWithIdEspecific({rute:"stars", id:"total-stars", data: {
    total: newTotal
  }});
  store.setEstrellas(newTotal);
  return newTotal;
}
