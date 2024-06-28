import { IAuthForm, IUser, IAuthResponse } from "@/types/auth.types";

const userAuthData: IAuthForm = {
  email: 'user@example.ru',
  password: '1234'
}
const userData: IUser = {
  id: Date.now(),
  name: "User User User",
  username: "User",
  email: "user@example.ru",
  address: {
    street: "",
    suite: "",
    city: "",
    zipcode: "",
    geo: {
      lat: "",
      lng: ""
    }
  },
  phone: "",
  website: "",
  company: {
    name: "",
    catchPhrase: "",
    bs: ""
  }
}

async function login(authData: IAuthForm): Promise<IAuthResponse | null> {
  const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
  let response: IAuthResponse | null = null;

  const logInServer = new Promise<IAuthResponse | null>((resolve, reject) => {
    // симулируем обращение к серверу
    setTimeout(() => {
      if (authData.email === userAuthData.email && authData.password === userAuthData.password) {
        resolve({
          accessToken,
          user: userData
        });
      } else {
        resolve(null);
      }
    }, 2000);
  });

  await logInServer
    .then(res => {
      if (res) {
        response = res;
      }
    })

  return response;
}

async function getRefreshToken(): Promise<IAuthResponse | null> {
  const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiayFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
  let response: IAuthResponse | null = null;

  const getRefreshTokenFromServer = new Promise<IAuthResponse>((resolve, reject) => {
    // симулируем обращение к серверу
    setTimeout(() => {
      resolve({
        accessToken,
        user: userData
      });
    }, 2000);
  });

  await getRefreshTokenFromServer
    .then(res => {
      response = res;
    })

  return response;
}

async function logout(): Promise<boolean> {
  let response: boolean = false;

  const logOutServer = new Promise<boolean>((resolve, reject) => {
    // симулируем обращение к серверу
    setTimeout(() => {
      resolve(true);
    }, 2000);
  });

  await logOutServer
    .then(res => {
      response = res;
    })

  return response;
}

export { login, getRefreshToken, logout }