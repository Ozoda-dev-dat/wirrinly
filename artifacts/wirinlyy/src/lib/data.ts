import chewyCookieImg from '@assets/image_1784180972868.png';
import strawberryChewyCookieImg from '@assets/image_1784180989713.png';
import matildaXlImg from '@assets/image_1784181039553.png';
import trifleImg from '@assets/image_1784181061892.png';
import strawberryCakeImg from '@assets/image_1784181073927.png';
import dovchaImg from '@assets/image_1784181088416.png';
import mixFruitCakeImg from '@assets/image_1784181113262.png';
import teddyCakeImg from '@assets/image_1784181137829.png';
import coloredCollectionImg from '@assets/image_1784181019893.png';

export const products = [
  { id: 'teddy-cake', name: 'Teddy Cake', price: 95000, image: teddyCakeImg, bgHover: 'hover:bg-[#4a2e21]' },
  { id: 'matilda-xl', name: 'Matilda XL', price: 95000, image: matildaXlImg, bgHover: 'hover:bg-[#3d1818]' },
  { id: 'strawberry-cake', name: 'Strawberry Cake', price: 105000, image: strawberryCakeImg, bgHover: 'hover:bg-[#421d23]' },
  { id: 'trifle', name: 'Trifle / Трайфл', price: 100000, image: trifleImg, bgHover: 'hover:bg-[#2e2621]' },
  { id: 'mix-fruit-cake', name: 'Mix Fruit Cake', price: 105000, image: mixFruitCakeImg, bgHover: 'hover:bg-[#3f2a1d]' },
  { id: 'dovcha', name: 'Dovcha', price: 90000, image: dovchaImg, bgHover: 'hover:bg-[#223520]' },
  { id: 'chewy-cookie', name: 'Chewy Cookie', price: 55000, image: chewyCookieImg, bgHover: 'hover:bg-[#422e1c]' },
  { id: 'strawberry-chewy-cookie', name: 'Strawberry Chewy Cookie', price: 55000, image: strawberryChewyCookieImg, bgHover: 'hover:bg-[#421d23]' },
];

export const coloredCollection = coloredCollectionImg;

export const heroProducts = [
  { id: 'teddy', image: teddyCakeImg, name: 'Teddy Cake' },
  { id: 'matilda', image: matildaXlImg, name: 'Matilda XL' },
  { id: 'strawberry', image: strawberryCakeImg, name: 'Strawberry Cake' },
];
