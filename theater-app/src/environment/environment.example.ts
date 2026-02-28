import { Environment } from "./environment.type";

export const environment: Environment  = {
    production: false,
    firebase: {
        apiKey: "dein-api-key",
        authDomain: "dein-projekt.firebaseapp.com",
        projectId: "dein-projekt-id",
        storageBucket: "dein-projekt.appspot.com",
        messagingSenderId: "123456789",
        appId: "1:123456789:web:abcdef"
    }
};