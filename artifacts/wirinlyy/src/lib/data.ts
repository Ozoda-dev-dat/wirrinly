import chewyCookieImg          from '@assets/Без_названия-removebg-preview_1784184619783.png';
import strawberryChewyCookieImg from '@assets/Без_названия__1_-removebg-preview_1784184619783.png';
import matildaXlImg             from '@assets/Без_названия__4_-removebg-preview_1784184619781.png';
import trifleImg                from '@assets/Без_названия__2_-removebg-preview_1784184619782.png';
import strawberryCakeImg        from '@assets/Без_названия__3_-removebg-preview_1784184619781.png';
import mixFruitCakeImg          from '@assets/Без_названия__5_-removebg-preview_1784184619780.png';
import teddyCakeImg             from '@assets/Без_названия__6_-removebg-preview_1784184619778.png';
import coloredCollectionImg     from '@assets/image_1784181019893.png';

import peachIceTeaImg   from '@/assets/drink-special6.png';
import puffySpecialImg  from '@/assets/drink-puffy-special.png';
import pinkPandaImg     from '@/assets/drink-panda.png';
import greenCanImg      from '@/assets/drink-green-can.png';
import orangeLemonImg   from '@/assets/drink-orange-lemon.png';
import tiramisuDrinkImg from '@/assets/drink-tiramisu.png';

export const products = [
  { id: 'teddy-cake',              name: 'Teddy Cake',              price: 95000,  image: teddyCakeImg,             rating: 5.0, reviews: 128 },
  { id: 'strawberry-cake',         name: 'Strawberry Cake',         price: 105000, image: strawberryCakeImg,        rating: 4.9, reviews: 94  },
  { id: 'trifle',                  name: 'Trifle / Трайфл',         price: 100000, image: trifleImg,                rating: 4.8, reviews: 76  },
  { id: 'mix-fruit-cake',          name: 'Mix Fruit Cake',          price: 105000, image: mixFruitCakeImg,          rating: 4.9, reviews: 111 },
  { id: 'dovcha',                  name: 'Dovcha',                  price: 90000,  image: matildaXlImg,             rating: 4.7, reviews: 58  },
  { id: 'chewy-cookie',            name: 'Chewy Cookie',            price: 55000,  image: chewyCookieImg,           rating: 5.0, reviews: 203 },
  { id: 'strawberry-chewy-cookie', name: 'Strawberry Chewy Cookie', price: 55000,  image: strawberryChewyCookieImg, rating: 4.8, reviews: 167 },
];

export const drinks = [
  { id: 'peach-ice-tea',  name: 'Peach Ice Tea',   price: 25000, image: peachIceTeaImg },
  { id: 'puffy-special',  name: 'Puffy Special',   price: 28000, image: puffySpecialImg },
  { id: 'pink-panda',     name: 'Pink Panda',      price: 28000, image: pinkPandaImg },
  { id: 'green-can',      name: 'Matcha Can',      price: 30000, image: greenCanImg },
  { id: 'orange-lemon',   name: 'Orange Lemonade', price: 22000, image: orangeLemonImg },
  { id: 'tiramisu-drink', name: 'Tiramisu Drink',  price: 30000, image: tiramisuDrinkImg },
];

export const coloredCollection = coloredCollectionImg;

export const heroProducts = [
  { id: 'teddy',      image: teddyCakeImg,      name: 'Teddy Cake' },
  { id: 'strawberry', image: strawberryCakeImg, name: 'Strawberry Cake' },
];
