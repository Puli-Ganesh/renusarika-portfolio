// Stable attachment order: A purple portrait, B fairy lights, C outdoors,
// D golden-hour portrait. All four actual supplied files are used distinctly.
export const photos = {
  hero: { source: 'c7deda704610c38e6113ec6bd8943002.jpg', width: 736, height: 1307, alt: 'Portrait supplied for Renusarika’s portfolio, in a purple sari', position: '50% 22%' },
  about: { source: '3d225bf7eeb230b1f90d17425e4ee188.jpg', width: 768, height: 1344, alt: 'Portrait supplied for Renusarika’s portfolio, with warm lights', position: '50% 20%' },
  learning: { source: '288faa4539e600996b2ca1abe3507da0.jpg', width: 879, height: 1563, alt: 'Outdoor portrait supplied for Renusarika’s portfolio', position: '50% 35%' },
  contact: { source: 'f35161d34858ba1e5707d7daf0524a9d.jpg', width: 1024, height: 1536, alt: 'Golden-hour portrait supplied for Renusarika’s portfolio', position: '50% 52%' },
};
export type PhotoRole = keyof typeof photos;
