import FragranceService from './services/fragranceService';

const resolvers = {
  fragrances: () => {
    return FragranceService.getAllFragrances();
  },
  fragrance: ({ id }: { id: string }) => {
    return FragranceService.getFragranceById(id);
  },
  addFragrance: ({ id, name, description, category, image_url }: { id: string, name: string, description: string, category: string, image_url: string }) => {
    return FragranceService.addFragrance({ id, name, description, category, image_url, created_at: '', updated_at: '' });
  },
  updateFragrance: ({ id, name, description, category, image_url }: { id: string, name?: string, description?: string, category?: string, image_url?: string }) => {
    return FragranceService.updateFragrance({ id, name, description, category, image_url });
  },
  deleteFragrance: ({ id }: { id: string }) => {
    return FragranceService.deleteFragrance(id);
  }
};

export default resolvers;
