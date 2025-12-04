
import { Product } from '../types';

// Updated to version 2 to force this new list to load for all users
export const CATALOG_VERSION = 2;

// Products are stored in METRIC units (mm, g).
export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: 'LAC172B',
    name: 'LAC172B',
    box: { itemsPerBox: 100, dimensions: { length: 0, width: 0, height: 0 }, grossWeight: 0 }
  },
  {
    id: 'LAC180',
    name: 'LAC180',
    box: { itemsPerBox: 500, dimensions: { length: 315, width: 415, height: 315 }, grossWeight: 11850 }
  },
  {
    id: 'LAC181',
    name: 'LAC181',
    box: { itemsPerBox: 250, dimensions: { length: 360, width: 535, height: 265 }, grossWeight: 6025 }
  },
  {
    id: 'LLL147A',
    name: 'LLL147A',
    box: { itemsPerBox: 1600, dimensions: { length: 340, width: 230, height: 290 }, grossWeight: 13200 }
  },
  {
    id: 'LLL147A-ROW',
    name: 'LLL147A-ROW',
    box: { itemsPerBox: 1600, dimensions: { length: 340, width: 230, height: 290 }, grossWeight: 13850 }
  },
  {
    id: 'LLL162A',
    name: 'LLL162A',
    box: { itemsPerBox: 1600, dimensions: { length: 340, width: 230, height: 290 }, grossWeight: 13200 }
  },
  {
    id: 'LLL167D',
    name: 'LLL167D',
    box: { itemsPerBox: 1600, dimensions: { length: 340, width: 230, height: 290 }, grossWeight: 13200 }
  },
  {
    id: 'LML2001A',
    name: 'LML2001A',
    box: { itemsPerBox: 420, dimensions: { length: 600, width: 500, height: 400 }, grossWeight: 7500 }
  },
  {
    id: 'LML2001B',
    name: 'LML2001B',
    box: { itemsPerBox: 230, dimensions: { length: 600, width: 500, height: 400 }, grossWeight: 7000 }
  },
  {
    id: 'LML2006A',
    name: 'LML2006A',
    box: { itemsPerBox: 100, dimensions: { length: 640, width: 620, height: 220 }, grossWeight: 14700 }
  },
  {
    id: 'LML2006B',
    name: 'LML2006B',
    box: { itemsPerBox: 100, dimensions: { length: 720, width: 680, height: 220 }, grossWeight: 17000 }
  },
  {
    id: 'LSC101A',
    name: 'LSC101A',
    box: { itemsPerBox: 384, dimensions: { length: 315, width: 500, height: 165 }, grossWeight: 12000 }
  },
  {
    id: 'LSC101C',
    name: 'LSC101C',
    box: { itemsPerBox: 70, dimensions: { length: 325, width: 470, height: 260 }, grossWeight: 13000 }
  },
  {
    id: 'LSC102A',
    name: 'LSC102A',
    box: { itemsPerBox: 384, dimensions: { length: 320, width: 490, height: 180 }, grossWeight: 12000 }
  },
  {
    id: 'LSC102C',
    name: 'LSC102C',
    box: { itemsPerBox: 116, dimensions: { length: 320, width: 490, height: 180 }, grossWeight: 6500 }
  },
  {
    id: 'LSC104A',
    name: 'LSC104A',
    box: { itemsPerBox: 384, dimensions: { length: 320, width: 490, height: 180 }, grossWeight: 12000 }
  },
  {
    id: 'LSC104B',
    name: 'LSC104B',
    box: { itemsPerBox: 96, dimensions: { length: 325, width: 470, height: 260 }, grossWeight: 11640 }
  },
  {
    id: 'LSC105A',
    name: 'LSC105A',
    box: { itemsPerBox: 384, dimensions: { length: 320, width: 490, height: 180 }, grossWeight: 11920 }
  },
  {
    id: 'LSC105B',
    name: 'LSC105B',
    box: { itemsPerBox: 96, dimensions: { length: 320, width: 490, height: 180 }, grossWeight: 11640 }
  },
  {
    id: 'LSC108A',
    name: 'LSC108A',
    box: { itemsPerBox: 384, dimensions: { length: 320, width: 490, height: 180 }, grossWeight: 12000 }
  },
  {
    id: 'LSC108B',
    name: 'LSC108B',
    box: { itemsPerBox: 84, dimensions: { length: 320, width: 490, height: 180 }, grossWeight: 13700 }
  },
  {
    id: 'LSC109A',
    name: 'LSC109A',
    box: { itemsPerBox: 384, dimensions: { length: 320, width: 490, height: 180 }, grossWeight: 11850 }
  },
  {
    id: 'LSC109B',
    name: 'LSC109B',
    box: { itemsPerBox: 96, dimensions: { length: 325, width: 470, height: 260 }, grossWeight: 8000 }
  },
  {
    id: 'LSC110A',
    name: 'LSC110A',
    box: { itemsPerBox: 528, dimensions: { length: 325, width: 470, height: 260 }, grossWeight: 12000 }
  },
  {
    id: 'LSC110B',
    name: 'LSC110B',
    box: { itemsPerBox: 96, dimensions: { length: 320, width: 490, height: 180 }, grossWeight: 12500 }
  },
  {
    id: 'LSC112B',
    name: 'LSC112B',
    box: { itemsPerBox: 36, dimensions: { length: 320, width: 490, height: 180 }, grossWeight: 13100 }
  },
  {
    id: 'LSC113B',
    name: 'LSC113B',
    box: { itemsPerBox: 30, dimensions: { length: 320, width: 490, height: 180 }, grossWeight: 5500 }
  },
  {
    id: 'LSC114B',
    name: 'LSC114B',
    box: { itemsPerBox: 150, dimensions: { length: 290, width: 390, height: 273 }, grossWeight: 6500 }
  },
  {
    id: 'LSC115A',
    name: 'LSC115A',
    box: { itemsPerBox: 80, dimensions: { length: 320, width: 490, height: 180 }, grossWeight: 6450 }
  },
  {
    id: 'LSC142A',
    name: 'LSC142A',
    box: { itemsPerBox: 96, dimensions: { length: 325, width: 470, height: 260 }, grossWeight: 8000 }
  },
  {
    id: 'LSC142FT',
    name: 'LSC142FT',
    box: { itemsPerBox: 528, dimensions: { length: 325, width: 470, height: 260 }, grossWeight: 12000 }
  },
  {
    id: 'LSC143A',
    name: 'LSC143A',
    box: { itemsPerBox: 96, dimensions: { length: 325, width: 470, height: 260 }, grossWeight: 9000 }
  },
  {
    id: 'LSC143FT',
    name: 'LSC143FT',
    box: { itemsPerBox: 528, dimensions: { length: 325, width: 470, height: 260 }, grossWeight: 12000 }
  },
  {
    id: 'LSC144B',
    name: 'LSC144B',
    box: { itemsPerBox: 36, dimensions: { length: 320, width: 490, height: 180 }, grossWeight: 13100 }
  },
  {
    id: 'LSC145A',
    name: 'LSC145A',
    box: { itemsPerBox: 504, dimensions: { length: 325, width: 470, height: 260 }, grossWeight: 12500 }
  },
  {
    id: 'LSC146A',
    name: 'LSC146A',
    box: { itemsPerBox: 96, dimensions: { length: 325, width: 470, height: 260 }, grossWeight: 8850 }
  },
  {
    id: 'LSC148A',
    name: 'LSC148A',
    box: { itemsPerBox: 60, dimensions: { length: 235, width: 485, height: 190 }, grossWeight: 13700 }
  },
  {
    id: 'LSC149A',
    name: 'LSC149A',
    box: { itemsPerBox: 80, dimensions: { length: 300, width: 380, height: 180 }, grossWeight: 13000 }
  },
  {
    id: 'LSC150A',
    name: 'LSC150A',
    box: { itemsPerBox: 72, dimensions: { length: 230, width: 445, height: 195 }, grossWeight: 9400 }
  },
  {
    id: 'LSC153A',
    name: 'LSC153A',
    box: { itemsPerBox: 84, dimensions: { length: 500, width: 400, height: 400 }, grossWeight: 27300 }
  },
  {
    id: 'LSC161A',
    name: 'LSC161A',
    box: { itemsPerBox: 40, dimensions: { length: 390, width: 765, height: 285 }, grossWeight: 19820 }
  },
  {
    id: 'LSC177A',
    name: 'LSC177A',
    box: { itemsPerBox: 96, dimensions: { length: 325, width: 470, height: 260 }, grossWeight: 8000 }
  },
  {
    id: 'LSC177FT',
    name: 'LSC177FT',
    box: { itemsPerBox: 528, dimensions: { length: 325, width: 470, height: 260 }, grossWeight: 12000 }
  },
  {
    id: 'LSC178A',
    name: 'LSC178A',
    box: { itemsPerBox: 96, dimensions: { length: 325, width: 470, height: 260 }, grossWeight: 8000 }
  },
  {
    id: 'LSC178FT',
    name: 'LSC178FT',
    box: { itemsPerBox: 528, dimensions: { length: 325, width: 470, height: 260 }, grossWeight: 12000 }
  },
  {
    id: 'LSC179A',
    name: 'LSC179A',
    box: { itemsPerBox: 96, dimensions: { length: 325, width: 470, height: 260 }, grossWeight: 8000 }
  },
  {
    id: 'LSC179FT',
    name: 'LSC179FT',
    box: { itemsPerBox: 528, dimensions: { length: 325, width: 470, height: 260 }, grossWeight: 12000 }
  },
  {
    id: 'M2A',
    name: 'M2A',
    box: { itemsPerBox: 40, dimensions: { length: 387, width: 375, height: 375 }, grossWeight: 12700 }
  },
  {
    id: 'M2A-FD',
    name: 'M2A-FD',
    box: { itemsPerBox: 40, dimensions: { length: 387, width: 375, height: 375 }, grossWeight: 12700 }
  },
  {
    id: 'M2B',
    name: 'M2B',
    box: { itemsPerBox: 40, dimensions: { length: 387, width: 375, height: 375 }, grossWeight: 12700 }
  },
  {
    id: 'M2B-FD',
    name: 'M2B-FD',
    box: { itemsPerBox: 40, dimensions: { length: 387, width: 375, height: 375 }, grossWeight: 12700 }
  },
  {
    id: 'M2C',
    name: 'M2C',
    box: { itemsPerBox: 40, dimensions: { length: 387, width: 375, height: 375 }, grossWeight: 12700 }
  },
  {
    id: 'M2C-FD',
    name: 'M2C-FD',
    box: { itemsPerBox: 40, dimensions: { length: 387, width: 375, height: 375 }, grossWeight: 12700 }
  },
  {
    id: 'M2E',
    name: 'M2E',
    box: { itemsPerBox: 40, dimensions: { length: 387, width: 375, height: 375 }, grossWeight: 12700 }
  },
  {
    id: 'M2P_AC',
    name: 'M2P_AC',
    box: { itemsPerBox: 40, dimensions: { length: 387, width: 375, height: 375 }, grossWeight: 12700 }
  },
  {
    id: 'M2P_FC',
    name: 'M2P_FC',
    box: { itemsPerBox: 40, dimensions: { length: 387, width: 375, height: 375 }, grossWeight: 12700 }
  },
  {
    id: 'MAC105A',
    name: 'MAC105A',
    box: { itemsPerBox: 100, dimensions: { length: 490, width: 320, height: 210 }, grossWeight: 700 }
  },
  {
    id: 'MAC105A-FD',
    name: 'MAC105A-FD',
    box: { itemsPerBox: 100, dimensions: { length: 490, width: 320, height: 210 }, grossWeight: 700 }
  },
  {
    id: 'MAC105B',
    name: 'MAC105B',
    box: { itemsPerBox: 100, dimensions: { length: 490, width: 320, height: 210 }, grossWeight: 700 }
  },
  {
    id: 'MAC105B-FD',
    name: 'MAC105B-FD',
    box: { itemsPerBox: 100, dimensions: { length: 490, width: 320, height: 210 }, grossWeight: 700 }
  },
  {
    id: 'MAC105C',
    name: 'MAC105C',
    box: { itemsPerBox: 100, dimensions: { length: 490, width: 320, height: 210 }, grossWeight: 700 }
  },
  {
    id: 'MAC105C-FD',
    name: 'MAC105C-FD',
    box: { itemsPerBox: 100, dimensions: { length: 490, width: 320, height: 210 }, grossWeight: 700 }
  },
  {
    id: 'MAC105D',
    name: 'MAC105D',
    box: { itemsPerBox: 100, dimensions: { length: 490, width: 320, height: 210 }, grossWeight: 700 }
  },
  {
    id: 'MAC105D-FD',
    name: 'MAC105D-FD',
    box: { itemsPerBox: 100, dimensions: { length: 490, width: 320, height: 210 }, grossWeight: 700 }
  },
  {
    id: 'MAC105E',
    name: 'MAC105E',
    box: { itemsPerBox: 100, dimensions: { length: 490, width: 320, height: 210 }, grossWeight: 700 }
  },
  {
    id: 'MAC105E-FD',
    name: 'MAC105E-FD',
    box: { itemsPerBox: 100, dimensions: { length: 490, width: 320, height: 210 }, grossWeight: 700 }
  },
  {
    id: 'MAC105F',
    name: 'MAC105F',
    box: { itemsPerBox: 100, dimensions: { length: 490, width: 320, height: 210 }, grossWeight: 700 }
  },
  {
    id: 'MAC105F-FD',
    name: 'MAC105F-FD',
    box: { itemsPerBox: 100, dimensions: { length: 490, width: 320, height: 210 }, grossWeight: 700 }
  },
  {
    id: 'MAC105G',
    name: 'MAC105G',
    box: { itemsPerBox: 100, dimensions: { length: 490, width: 320, height: 210 }, grossWeight: 700 }
  },
  {
    id: 'MAC116A',
    name: 'MAC116A',
    box: { itemsPerBox: 80, dimensions: { length: 520, width: 500, height: 500 }, grossWeight: 17900 }
  },
  {
    id: 'MAC116B',
    name: 'MAC116B',
    box: { itemsPerBox: 80, dimensions: { length: 520, width: 500, height: 500 }, grossWeight: 17900 }
  },
  {
    id: 'MAC116C',
    name: 'MAC116C',
    box: { itemsPerBox: 80, dimensions: { length: 520, width: 500, height: 500 }, grossWeight: 17900 }
  },
  {
    id: 'MAC134I',
    name: 'MAC134I',
    box: { itemsPerBox: 200, dimensions: { length: 390, width: 380, height: 380 }, grossWeight: 7900 }
  },
  {
    id: 'MAC134J',
    name: 'MAC134J',
    box: { itemsPerBox: 200, dimensions: { length: 390, width: 380, height: 380 }, grossWeight: 7900 }
  },
  {
    id: 'MAC134K',
    name: 'MAC134K',
    box: { itemsPerBox: 200, dimensions: { length: 390, width: 380, height: 380 }, grossWeight: 7900 }
  },
  {
    id: 'MAC143B',
    name: 'MAC143B',
    box: { itemsPerBox: 100, dimensions: { length: 0, width: 0, height: 0 }, grossWeight: 0 }
  },
  {
    id: 'MAC151A',
    name: 'MAC151A',
    box: { itemsPerBox: 100, dimensions: { length: 490, width: 320, height: 210 }, grossWeight: 2000 }
  },
  {
    id: 'MAC151B',
    name: 'MAC151B',
    box: { itemsPerBox: 100, dimensions: { length: 490, width: 320, height: 210 }, grossWeight: 2000 }
  },
  {
    id: 'MAC151E',
    name: 'MAC151E',
    box: { itemsPerBox: 100, dimensions: { length: 490, width: 320, height: 210 }, grossWeight: 2000 }
  },
  {
    id: 'MEC102A',
    name: 'MEC102A',
    box: { itemsPerBox: 40, dimensions: { length: 387, width: 375, height: 375 }, grossWeight: 12700 }
  },
  {
    id: 'MEC102A-FD',
    name: 'MEC102A-FD',
    box: { itemsPerBox: 40, dimensions: { length: 387, width: 375, height: 375 }, grossWeight: 12700 }
  },
  {
    id: 'MEC102B',
    name: 'MEC102B',
    box: { itemsPerBox: 40, dimensions: { length: 387, width: 375, height: 375 }, grossWeight: 12700 }
  },
  {
    id: 'MEC102B-FD',
    name: 'MEC102B-FD',
    box: { itemsPerBox: 40, dimensions: { length: 387, width: 375, height: 375 }, grossWeight: 12700 }
  },
  {
    id: 'MEC102C',
    name: 'MEC102C',
    box: { itemsPerBox: 40, dimensions: { length: 387, width: 375, height: 375 }, grossWeight: 12700 }
  },
  {
    id: 'MEC102C-FD',
    name: 'MEC102C-FD',
    box: { itemsPerBox: 40, dimensions: { length: 387, width: 375, height: 375 }, grossWeight: 12700 }
  },
  {
    id: 'MEC102D',
    name: 'MEC102D',
    box: { itemsPerBox: 40, dimensions: { length: 387, width: 375, height: 375 }, grossWeight: 12700 }
  },
  {
    id: 'MEC102D-FD',
    name: 'MEC102D-FD',
    box: { itemsPerBox: 40, dimensions: { length: 387, width: 375, height: 375 }, grossWeight: 12700 }
  },
  {
    id: 'MEC102E',
    name: 'MEC102E',
    box: { itemsPerBox: 40, dimensions: { length: 387, width: 375, height: 375 }, grossWeight: 12700 }
  },
  {
    id: 'MEC102E-FD',
    name: 'MEC102E-FD',
    box: { itemsPerBox: 40, dimensions: { length: 387, width: 375, height: 375 }, grossWeight: 12700 }
  },
  {
    id: 'MEC102F',
    name: 'MEC102F',
    box: { itemsPerBox: 40, dimensions: { length: 387, width: 375, height: 375 }, grossWeight: 12700 }
  },
  {
    id: 'MEC102F-FD',
    name: 'MEC102F-FD',
    box: { itemsPerBox: 40, dimensions: { length: 387, width: 375, height: 375 }, grossWeight: 12700 }
  },
  {
    id: 'MEC120A',
    name: 'MEC120A',
    box: { itemsPerBox: 40, dimensions: { length: 510, width: 470, height: 400 }, grossWeight: 21000 }
  },
  {
    id: 'MEC120A-FD',
    name: 'MEC120A-FD',
    box: { itemsPerBox: 40, dimensions: { length: 510, width: 470, height: 400 }, grossWeight: 21000 }
  },
  {
    id: 'MEC120B',
    name: 'MEC120B',
    box: { itemsPerBox: 40, dimensions: { length: 510, width: 470, height: 400 }, grossWeight: 21000 }
  },
  {
    id: 'MEC120B-FD',
    name: 'MEC120B-FD',
    box: { itemsPerBox: 40, dimensions: { length: 510, width: 470, height: 400 }, grossWeight: 21000 }
  },
  {
    id: 'MEC120C',
    name: 'MEC120C',
    box: { itemsPerBox: 40, dimensions: { length: 510, width: 470, height: 400 }, grossWeight: 21000 }
  },
  {
    id: 'MEC120C-FD',
    name: 'MEC120C-FD',
    box: { itemsPerBox: 40, dimensions: { length: 510, width: 470, height: 400 }, grossWeight: 21000 }
  },
  {
    id: 'MEC120D',
    name: 'MEC120D',
    box: { itemsPerBox: 40, dimensions: { length: 510, width: 470, height: 400 }, grossWeight: 21000 }
  },
  {
    id: 'MEC120D-FD',
    name: 'MEC120D-FD',
    box: { itemsPerBox: 40, dimensions: { length: 510, width: 470, height: 400 }, grossWeight: 21000 }
  },
  {
    id: 'MEC120E',
    name: 'MEC120E',
    box: { itemsPerBox: 40, dimensions: { length: 510, width: 470, height: 400 }, grossWeight: 21000 }
  },
  {
    id: 'MEC120E-FD',
    name: 'MEC120E-FD',
    box: { itemsPerBox: 40, dimensions: { length: 510, width: 470, height: 400 }, grossWeight: 21000 }
  },
  {
    id: 'MEC120F',
    name: 'MEC120F',
    box: { itemsPerBox: 40, dimensions: { length: 510, width: 470, height: 400 }, grossWeight: 21000 }
  },
  {
    id: 'MEC120F-FD',
    name: 'MEC120F-FD',
    box: { itemsPerBox: 40, dimensions: { length: 510, width: 470, height: 400 }, grossWeight: 21000 }
  },
  {
    id: 'MEC120G',
    name: 'MEC120G',
    box: { itemsPerBox: 40, dimensions: { length: 510, width: 470, height: 400 }, grossWeight: 21000 }
  },
  {
    id: 'MEC120G-FD',
    name: 'MEC120G-FD',
    box: { itemsPerBox: 40, dimensions: { length: 510, width: 470, height: 400 }, grossWeight: 21000 }
  },
  {
    id: 'MEC146A',
    name: 'MEC146A',
    box: { itemsPerBox: 40, dimensions: { length: 387, width: 375, height: 375 }, grossWeight: 12700 }
  },
  {
    id: 'MEC146B',
    name: 'MEC146B',
    box: { itemsPerBox: 40, dimensions: { length: 387, width: 375, height: 375 }, grossWeight: 12700 }
  },
  {
    id: 'MEC146E',
    name: 'MEC146E',
    box: { itemsPerBox: 40, dimensions: { length: 387, width: 375, height: 375 }, grossWeight: 12700 }
  },
  {
    id: 'MEC146H',
    name: 'MEC146H',
    box: { itemsPerBox: 40, dimensions: { length: 387, width: 375, height: 375 }, grossWeight: 12700 }
  },
  {
    id: 'MML125',
    name: 'MML125',
    box: { itemsPerBox: 420, dimensions: { length: 600, width: 500, height: 400 }, grossWeight: 8000 }
  },
  {
    id: 'MML140',
    name: 'MML140',
    box: { itemsPerBox: 75, dimensions: { length: 970, width: 1000, height: 250 }, grossWeight: 24000 }
  },
  {
    id: 'MML140A',
    name: 'MML140A',
    box: { itemsPerBox: 75, dimensions: { length: 970, width: 1000, height: 250 }, grossWeight: 24000 }
  },
  {
    id: 'MSC136A',
    name: 'MSC136A',
    box: { itemsPerBox: 24, dimensions: { length: 355, width: 228, height: 228 }, grossWeight: 6180 }
  },
  {
    id: 'MSC137A',
    name: 'MSC137A',
    box: { itemsPerBox: 40, dimensions: { length: 508, width: 381, height: 203 }, grossWeight: 13200 }
  },
  {
    id: 'MSC138A',
    name: 'MSC138A',
    box: { itemsPerBox: 48, dimensions: { length: 342, width: 267, height: 165 }, grossWeight: 7710 }
  },
  {
    id: 'R_LSC101C',
    name: 'R_LSC101C',
    box: { itemsPerBox: 24, dimensions: { length: 316, width: 214, height: 190 }, grossWeight: 3498 }
  },
  {
    id: 'R_LSC102C',
    name: 'R_LSC102C',
    box: { itemsPerBox: 24, dimensions: { length: 286, width: 194, height: 134 }, grossWeight: 1554 }
  },
  {
    id: 'R_LSC104B',
    name: 'R_LSC104B',
    box: { itemsPerBox: 24, dimensions: { length: 352, width: 238, height: 134 }, grossWeight: 2409 }
  },
  {
    id: 'R_LSC109B',
    name: 'R_LSC109B',
    box: { itemsPerBox: 24, dimensions: { length: 352, width: 238, height: 120 }, grossWeight: 2175 }
  },
  {
    id: 'R_LSC110B',
    name: 'R_LSC110B',
    box: { itemsPerBox: 24, dimensions: { length: 274, width: 186, height: 151 }, grossWeight: 2859 }
  },
  {
    id: 'R_LSC113B',
    name: 'R_LSC113B',
    box: { itemsPerBox: 24, dimensions: { length: 328, width: 300, height: 203 }, grossWeight: 3916 }
  },
  {
    id: 'R_LSC114B',
    name: 'R_LSC114B',
    box: { itemsPerBox: 24, dimensions: { length: 322, width: 184, height: 146 }, grossWeight: 1246 }
  },
  {
    id: 'R_LSC115A',
    name: 'R_LSC115A',
    box: { itemsPerBox: 24, dimensions: { length: 262, width: 214, height: 156 }, grossWeight: 2452 }
  },
  {
    id: 'R_LSC142A',
    name: 'R_LSC142A',
    box: { itemsPerBox: 24, dimensions: { length: 352, width: 238, height: 162 }, grossWeight: 2220 }
  },
  {
    id: 'R_LSC143A',
    name: 'R_LSC143A',
    box: { itemsPerBox: 24, dimensions: { length: 352, width: 238, height: 162 }, grossWeight: 2547 }
  },
  {
    id: 'R_LSC146A',
    name: 'R_LSC146A',
    box: { itemsPerBox: 24, dimensions: { length: 352, width: 238, height: 120 }, grossWeight: 2283 }
  },
  {
    id: 'R_LSC149A',
    name: 'R_LSC149A',
    box: { itemsPerBox: 24, dimensions: { length: 245, width: 164, height: 173 }, grossWeight: 4200 }
  },
  {
    id: 'R_LSC177A',
    name: 'R_LSC177A',
    box: { itemsPerBox: 24, dimensions: { length: 352, width: 238, height: 162 }, grossWeight: 2220 }
  },
  {
    id: 'R_LSC178A',
    name: 'R_LSC178A',
    box: { itemsPerBox: 24, dimensions: { length: 352, width: 238, height: 162 }, grossWeight: 2220 }
  },
  {
    id: 'R_LSC179A',
    name: 'R_LSC179A',
    box: { itemsPerBox: 24, dimensions: { length: 352, width: 238, height: 162 }, grossWeight: 2220 }
  },
  {
    id: 'R_MAC105A',
    name: 'R_MAC105A',
    box: { itemsPerBox: 48, dimensions: { length: 340, width: 266, height: 113 }, grossWeight: 2500 }
  },
  {
    id: 'R_MAC105B',
    name: 'R_MAC105B',
    box: { itemsPerBox: 48, dimensions: { length: 340, width: 266, height: 113 }, grossWeight: 2500 }
  },
  {
    id: 'R_MAC105C',
    name: 'R_MAC105C',
    box: { itemsPerBox: 48, dimensions: { length: 340, width: 266, height: 113 }, grossWeight: 2500 }
  },
  {
    id: 'R_MAC105D',
    name: 'R_MAC105D',
    box: { itemsPerBox: 48, dimensions: { length: 340, width: 266, height: 113 }, grossWeight: 2500 }
  },
  {
    id: 'R_MAC105E',
    name: 'R_MAC105E',
    box: { itemsPerBox: 48, dimensions: { length: 340, width: 226, height: 113 }, grossWeight: 2500 }
  },
  {
    id: 'R_MAC105F',
    name: 'R_MAC105F',
    box: { itemsPerBox: 48, dimensions: { length: 340, width: 226, height: 113 }, grossWeight: 2500 }
  },
  {
    id: 'R_MAC116A',
    name: 'R_MAC116A',
    box: { itemsPerBox: 24, dimensions: { length: 400, width: 400, height: 210 }, grossWeight: 2880 }
  },
  {
    id: 'R_MAC116B',
    name: 'R_MAC116B',
    box: { itemsPerBox: 24, dimensions: { length: 400, width: 400, height: 210 }, grossWeight: 2880 }
  },
  {
    id: 'R_MAC116C',
    name: 'R_MAC116C',
    box: { itemsPerBox: 24, dimensions: { length: 400, width: 400, height: 210 }, grossWeight: 2880 }
  },
  {
    id: 'R_MAC151B',
    name: 'R_MAC151B',
    box: { itemsPerBox: 48, dimensions: { length: 340, width: 226, height: 113 }, grossWeight: 2500 }
  },
  {
    id: 'R_MAC151E',
    name: 'R_MAC151E',
    box: { itemsPerBox: 48, dimensions: { length: 340, width: 226, height: 113 }, grossWeight: 2500 }
  },
  {
    id: 'R_MBN103A',
    name: 'R_MBN103A',
    box: { itemsPerBox: 6, dimensions: { length: 337, width: 230, height: 195 }, grossWeight: 0 }
  },
  {
    id: 'R_MEC102A',
    name: 'R_MEC102A',
    box: { itemsPerBox: 12, dimensions: { length: 385, width: 360, height: 240 }, grossWeight: 5920 }
  },
  {
    id: 'R_MEC102B',
    name: 'R_MEC102B',
    box: { itemsPerBox: 12, dimensions: { length: 385, width: 360, height: 240 }, grossWeight: 5920 }
  },
  {
    id: 'R_MEC102C',
    name: 'R_MEC102C',
    box: { itemsPerBox: 12, dimensions: { length: 385, width: 360, height: 240 }, grossWeight: 5920 }
  },
  {
    id: 'R_MEC102D',
    name: 'R_MEC102D',
    box: { itemsPerBox: 12, dimensions: { length: 385, width: 360, height: 240 }, grossWeight: 5920 }
  },
  {
    id: 'R_MEC102E',
    name: 'R_MEC102E',
    box: { itemsPerBox: 12, dimensions: { length: 385, width: 360, height: 240 }, grossWeight: 5920 }
  },
  {
    id: 'R_MEC102F',
    name: 'R_MEC102F',
    box: { itemsPerBox: 12, dimensions: { length: 385, width: 360, height: 240 }, grossWeight: 5920 }
  },
  {
    id: 'R_MEC120A',
    name: 'R_MEC120A',
    box: { itemsPerBox: 12, dimensions: { length: 440, width: 435, height: 185 }, grossWeight: 7000 }
  },
  {
    id: 'R_MEC120B',
    name: 'R_MEC120B',
    box: { itemsPerBox: 12, dimensions: { length: 440, width: 435, height: 185 }, grossWeight: 7000 }
  },
  {
    id: 'R_MEC120C',
    name: 'R_MEC120C',
    box: { itemsPerBox: 12, dimensions: { length: 440, width: 435, height: 185 }, grossWeight: 7000 }
  },
  {
    id: 'R_MEC120D',
    name: 'R_MEC120D',
    box: { itemsPerBox: 12, dimensions: { length: 440, width: 435, height: 185 }, grossWeight: 7000 }
  },
  {
    id: 'R_MEC120E',
    name: 'R_MEC120E',
    box: { itemsPerBox: 12, dimensions: { length: 440, width: 435, height: 185 }, grossWeight: 7000 }
  },
  {
    id: 'R_MEC120F',
    name: 'R_MEC120F',
    box: { itemsPerBox: 12, dimensions: { length: 440, width: 435, height: 185 }, grossWeight: 7000 }
  },
  {
    id: 'R_MEC135A',
    name: 'R_MEC135A',
    box: { itemsPerBox: 12, dimensions: { length: 385, width: 360, height: 240 }, grossWeight: 5800 }
  },
  {
    id: 'R_MEC135B',
    name: 'R_MEC135B',
    box: { itemsPerBox: 12, dimensions: { length: 385, width: 360, height: 240 }, grossWeight: 5800 }
  },
  {
    id: 'R_MEC135C',
    name: 'R_MEC135C',
    box: { itemsPerBox: 12, dimensions: { length: 385, width: 360, height: 240 }, grossWeight: 5800 }
  },
  {
    id: 'R_MEC135E',
    name: 'R_MEC135E',
    box: { itemsPerBox: 12, dimensions: { length: 385, width: 360, height: 240 }, grossWeight: 5800 }
  },
  {
    id: 'R_MEC135G',
    name: 'R_MEC135G',
    box: { itemsPerBox: 12, dimensions: { length: 385, width: 360, height: 240 }, grossWeight: 5800 }
  },
  {
    id: 'R_MEC146A',
    name: 'R_MEC146A',
    box: { itemsPerBox: 12, dimensions: { length: 385, width: 360, height: 240 }, grossWeight: 5920 }
  },
  {
    id: 'R_MEC146B',
    name: 'R_MEC146B',
    box: { itemsPerBox: 12, dimensions: { length: 385, width: 360, height: 240 }, grossWeight: 5920 }
  },
  {
    id: 'R_MEC146E',
    name: 'R_MEC146E',
    box: { itemsPerBox: 12, dimensions: { length: 385, width: 360, height: 240 }, grossWeight: 5920 }
  },
  {
    id: 'R_MHB101',
    name: 'R_MHB101',
    box: { itemsPerBox: 24, dimensions: { length: 274, width: 186, height: 129 }, grossWeight: 0 }
  },
  {
    id: 'R_MSC136A',
    name: 'R_MSC136A',
    box: { itemsPerBox: 12, dimensions: { length: 0, width: 0, height: 0 }, grossWeight: 0 }
  },
  {
    id: 'R_MSC137A',
    name: 'R_MSC137A',
    box: { itemsPerBox: 12, dimensions: { length: 0, width: 0, height: 0 }, grossWeight: 0 }
  },
  {
    id: 'SM1',
    name: 'SM1',
    box: { itemsPerBox: 400, dimensions: { length: 680, width: 450, height: 300 }, grossWeight: 14100 }
  }
];
