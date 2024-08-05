const formato_currency = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
});
const formato = new Intl.NumberFormat('es-MX', {});

export const responseErrors = (error: any, defaultMessage = 'Something was wrong, please try again', timeMessage = 3000) => {
  console.error({ error });
  let message = error?.response?.data?.message || error?.message || defaultMessage;
  setTimeout(() => {
    store?.setAlertData({message, color: "error", timedefault: timeMessage});
  },100)

};

export const downloadFile = (data: any, filename: any) => {
  const url = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
};

export const sanitizeHeaderContent = (headerContent: string) => {
  // Expresión regular para eliminar caracteres no válidos
  return headerContent.replace(/[^a-zA-Z0-9-_. ]/g, '');
};

export const generateColorRGB = ({ r, g, b, a }: any) => {
  const r_ = r || getNumberAleatorio({ min: 0, max: 255 });
  const g_ = g || getNumberAleatorio({ min: 0, max: 255 });
  const b_ = b || getNumberAleatorio({ min: 0, max: 255 });
  const a_ = a || 1;
  return {
    original: `rgba(${r_}, ${g_}, ${b_}, ${a_})`,
    transparent: `rgba(${r_}, ${g_}, ${b_}, ${0.3})`,
    no_transparent: `rgba(${r_}, ${g_}, ${b_}, ${1})`,
  };
};

export const getNumberAleatorio = ({ min = 0, max = 1000 }) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const formatNumber = (number = 0) => {
  return formato.format(number);
};

export const currencyNumber = (number = 0) => {
  return formato_currency.format(number);
};


// Función asincrónica para leer el contenido del archivo
export const readFileAsync = async (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event: any) => {
      resolve(event.target.result);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsText(file);
  });
};

export const contrasenaMaestra = () => {
  return "karla-"
}