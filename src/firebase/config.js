import { initializeApp } from 'firebase/app';

const firebaseConfig = {
	apiKey: 'AIzaSyD5TGfYZElzGcAn57IGwhEh5PIWELPCDa4',
	authDomain: 'yoyo-time-tracker-703e9.firebaseapp.com',
	projectId: 'yoyo-time-tracker-703e9',
	storageBucket: 'yoyo-time-tracker-703e9.appspot.com',
	messagingSenderId: '669820145776',
	appId: '1:669820145776:web:24ea159cd2b1c670f0e4b5',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
