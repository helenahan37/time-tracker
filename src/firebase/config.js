import { initializeApp } from 'firebase/app';

const firebaseConfig = {
	apiKey: 'AIzaSyA7fVurjAA41CH30JktscU2Qy6lrdAEAVU',
	authDomain: 'yoyo-time-tracker.firebaseapp.com',
	projectId: 'yoyo-time-tracker',
	storageBucket: 'yoyo-time-tracker.appspot.com',
	messagingSenderId: '85060388909',
	appId: '1:85060388909:web:2bf5873fa3311360fd10a4',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
