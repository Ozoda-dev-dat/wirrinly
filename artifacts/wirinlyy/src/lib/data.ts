import chewyCookieImg from '@assets/Без_названия-removebg-preview_1784184619783.png';
import strawberryChewyCookieImg from '@assets/Без_названия__1_-removebg-preview_1784184619783.png';
import matildaXlImg from '@assets/Без_названия__4_-removebg-preview_1784184619781.png';
import trifleImg from '@assets/Без_названия__2_-removebg-preview_1784184619782.png';
import strawberryCakeImg from '@assets/Без_названия__3_-removebg-preview_1784184619781.png';
import mixFruitCakeImg from '@assets/Без_названия__5_-removebg-preview_1784184619780.png';
import teddyCakeImg from '@assets/Без_названия__6_-removebg-preview_1784184619778.png';
import coloredCollectionImg from '@assets/image_1784181019893.png';

export const products = [
  { id: 'teddy-cake', name: 'Teddy Cake', price: 95000, image: teddyCakeImg, bgHover: 'hover:bg-[#4a2e21]' },
  { id: 'strawberry-cake', name: 'Strawberry Cake', price: 105000, image: strawberryCakeImg, bgHover: 'hover:bg-[#421d23]' },
  { id: 'trifle', name: 'Trifle / Трайфл', price: 100000, image: trifleImg, bgHover: 'hover:bg-[#2e2621]' },
  { id: 'mix-fruit-cake', name: 'Mix Fruit Cake', price: 105000, image: mixFruitCakeImg, bgHover: 'hover:bg-[#3f2a1d]' },
  { id: 'dovcha', name: 'Dovcha', price: 90000, image: matildaXlImg, bgHover: 'hover:bg-[#3d1818]' },
  { id: 'chewy-cookie', name: 'Chewy Cookie', price: 55000, image: chewyCookieImg, bgHover: 'hover:bg-[#422e1c]' },
  { id: 'strawberry-chewy-cookie', name: 'Strawberry Chewy Cookie', price: 55000, image: strawberryChewyCookieImg, bgHover: 'hover:bg-[#421d23]' },
];

export const coloredCollection = coloredCollectionImg;

export const drinks: { id: string; name: string; price: number; image: string | null }[] = [
  { id: 'drink-1', name: 'Ichimlik 1', price: 25000, image: null },
  { id: 'drink-2', name: 'Ichimlik 2', price: 25000, image: null },
  { id: 'drink-3', name: 'Ichimlik 3', price: 25000, image: null },
  { id: 'drink-4', name: 'Ichimlik 4', price: 25000, image: null },
];

export const heroProducts = [
  { id: 'teddy', image: teddyCakeImg, name: 'Teddy Cake' },
  { id: 'strawberry', image: strawberryCakeImg, name: 'Strawberry Cake' },
];
