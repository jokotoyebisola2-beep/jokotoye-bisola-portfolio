import {
  db,
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
  updateDoc,
  onSnapshot,
  storage,
  ref,
  uploadString,
  getDownloadURL,
  OperationType,
  handleFirestoreError
} from './firebase';
import { Project, Service, Testimonial, Message, MediaItem, WebsiteSettings, MediaFolder } from '../types';

// Collection references
const PROJECTS_COL = 'projects';
const SERVICES_COL = 'services';
const REVIEWS_COL = 'reviews';
const MESSAGES_COL = 'messages';
const MEDIA_COL = 'media';
const SETTINGS_COL = 'settings';

const DEFAULT_SETTINGS: WebsiteSettings = {
  heroHeadline: 'I build websites and AI tools that help businesses grow.',
  heroSubheadline: 'I create websites, web apps, and AI solutions that bring in more customers, save time, and help businesses grow.',
  professionalTitle: 'AI Product Engineer & UI/UX Designer',
  brandStatement: 'Helping businesses grow through smart design, AI, and modern web experiences.',
  whatsappNumber: '2349033467029',
  email: 'jokotoyebisola2@gmail.com',
  logoUrl: '',
  profilePhotoUrl: '',
  resumeUrl: '',
  footerText: '© ' + new Date().getFullYear() + ' Jokotoye Bisola. All rights reserved.',
  socialLinks: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
  },
  updatedAt: new Date().toISOString(),
};

export const cmsService = {
  // ===========================================
  // PROJECTS
  // ===========================================
  async getProjects(): Promise<Project[]> {
    try {
      const snapshot = await getDocs(collection(db, PROJECTS_COL));
      const list: Project[] = [];
      snapshot.forEach(docSnap => {
        list.push({ id: docSnap.id, ...docSnap.data() } as Project);
      });
      return list.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, PROJECTS_COL);
    }
  },

  subscribeProjects(callback: (projects: Project[]) => void, onError?: (error: unknown) => void) {
    return onSnapshot(
      collection(db, PROJECTS_COL),
      (snapshot) => {
        const list: Project[] = [];
        snapshot.forEach(docSnap => {
          list.push({ id: docSnap.id, ...docSnap.data() } as Project);
        });
        // Sort by newest first (createdAt descending)
        callback(
          list.sort((a, b) => {
            const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            if (timeA !== timeB) return timeB - timeA;
            return (a.order ?? 0) - (b.order ?? 0);
          })
        );
      },
      (error) => {
        console.error('Projects subscription error:', error);
        if (onError) onError(error);
        else callback([]);
      }
    );
  },

  async getProjectBySlugOrId(idOrSlug: string): Promise<Project | null> {
    try {
      const docRef = doc(db, PROJECTS_COL, idOrSlug);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Project;
      }
      const projects = await this.getProjects();
      return projects.find(p => p.id === idOrSlug || p.slug === idOrSlug) || null;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, `${PROJECTS_COL}/${idOrSlug}`);
    }
  },

  async saveProject(project: Partial<Project>): Promise<string> {
    const now = new Date().toISOString();
    const id = project.id || `proj_${Date.now()}`;
    const slug = project.slug || project.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || id;

    const data: Partial<Project> = {
      ...project,
      id,
      slug,
      status: project.status || 'published',
      featured: project.featured ?? false,
      updatedAt: now,
      createdAt: project.createdAt || now,
    };

    try {
      await setDoc(doc(db, PROJECTS_COL, id), data, { merge: true });
      return id;
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `${PROJECTS_COL}/${id}`);
    }
  },

  async deleteProject(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, PROJECTS_COL, id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `${PROJECTS_COL}/${id}`);
    }
  },

  // ===========================================
  // SERVICES
  // ===========================================
  async getServices(): Promise<Service[]> {
    try {
      const snapshot = await getDocs(collection(db, SERVICES_COL));
      const list: Service[] = [];
      snapshot.forEach(docSnap => {
        list.push({ id: docSnap.id, ...docSnap.data() } as Service);
      });
      return list.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, SERVICES_COL);
    }
  },

  subscribeServices(callback: (services: Service[]) => void, onError?: (error: unknown) => void) {
    return onSnapshot(
      collection(db, SERVICES_COL),
      (snapshot) => {
        const list: Service[] = [];
        snapshot.forEach(docSnap => {
          list.push({ id: docSnap.id, ...docSnap.data() } as Service);
        });
        callback(list.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
      },
      (error) => {
        console.error('Services subscription error:', error);
        if (onError) onError(error);
        else callback([]);
      }
    );
  },

  async saveService(service: Partial<Service>): Promise<string> {
    const id = service.id || `srv_${Date.now()}`;
    const data: Partial<Service> = {
      ...service,
      id,
      status: service.status || 'active',
    };
    try {
      await setDoc(doc(db, SERVICES_COL, id), data, { merge: true });
      return id;
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `${SERVICES_COL}/${id}`);
    }
  },

  async deleteService(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, SERVICES_COL, id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `${SERVICES_COL}/${id}`);
    }
  },

  // ===========================================
  // REVIEWS
  // ===========================================
  async getReviews(): Promise<Testimonial[]> {
    try {
      const snapshot = await getDocs(collection(db, REVIEWS_COL));
      const list: Testimonial[] = [];
      snapshot.forEach(docSnap => {
        list.push({ id: docSnap.id, ...docSnap.data() } as Testimonial);
      });
      return list.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, REVIEWS_COL);
    }
  },

  subscribeReviews(callback: (reviews: Testimonial[]) => void, onError?: (error: unknown) => void) {
    return onSnapshot(
      collection(db, REVIEWS_COL),
      (snapshot) => {
        const list: Testimonial[] = [];
        snapshot.forEach(docSnap => {
          list.push({ id: docSnap.id, ...docSnap.data() } as Testimonial);
        });
        callback(list.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
      },
      (error) => {
        console.error('Reviews subscription error:', error);
        if (onError) onError(error);
        else callback([]);
      }
    );
  },

  async saveReview(review: Partial<Testimonial>): Promise<string> {
    const id = review.id || `rev_${Date.now()}`;
    const data: Partial<Testimonial> = {
      ...review,
      id,
      status: review.status || 'published',
      rating: review.rating ?? 5,
    };
    try {
      await setDoc(doc(db, REVIEWS_COL, id), data, { merge: true });
      return id;
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `${REVIEWS_COL}/${id}`);
    }
  },

  async deleteReview(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, REVIEWS_COL, id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `${REVIEWS_COL}/${id}`);
    }
  },

  // ===========================================
  // MESSAGES
  // ===========================================
  async getMessages(): Promise<Message[]> {
    try {
      const snapshot = await getDocs(collection(db, MESSAGES_COL));
      const list: Message[] = [];
      snapshot.forEach(docSnap => {
        list.push({ id: docSnap.id, ...docSnap.data() } as Message);
      });
      return list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, MESSAGES_COL);
    }
  },

  subscribeMessages(callback: (messages: Message[]) => void, onError?: (error: unknown) => void) {
    return onSnapshot(
      collection(db, MESSAGES_COL),
      (snapshot) => {
        const list: Message[] = [];
        snapshot.forEach(docSnap => {
          list.push({ id: docSnap.id, ...docSnap.data() } as Message);
        });
        callback(list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
      },
      (error) => {
        console.error('Messages subscription error:', error);
        if (onError) onError(error);
        else callback([]);
      }
    );
  },

  async sendMessage(message: { name: string; email: string; subject?: string; message: string }): Promise<string> {
    const id = `msg_${Date.now()}`;
    const newMsg: Message = {
      id,
      ...message,
      date: new Date().toISOString(),
      status: 'unread',
    };
    try {
      await setDoc(doc(db, MESSAGES_COL, id), newMsg);
      return id;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `${MESSAGES_COL}/${id}`);
    }
  },

  async updateMessageStatus(id: string, status: 'unread' | 'read' | 'archived'): Promise<void> {
    try {
      await updateDoc(doc(db, MESSAGES_COL, id), { status });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `${MESSAGES_COL}/${id}`);
    }
  },

  async deleteMessage(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, MESSAGES_COL, id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `${MESSAGES_COL}/${id}`);
    }
  },

  // ===========================================
  // WEBSITE SETTINGS
  // ===========================================
  async getSettings(): Promise<WebsiteSettings> {
    try {
      const docSnap = await getDoc(doc(db, SETTINGS_COL, 'website'));
      if (docSnap.exists()) {
        return docSnap.data() as WebsiteSettings;
      }
      return DEFAULT_SETTINGS;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, `${SETTINGS_COL}/website`);
    }
  },

  subscribeSettings(callback: (settings: WebsiteSettings) => void, onError?: (error: unknown) => void) {
    return onSnapshot(
      doc(db, SETTINGS_COL, 'website'),
      (docSnap) => {
        if (docSnap.exists()) {
          callback(docSnap.data() as WebsiteSettings);
        } else {
          callback(DEFAULT_SETTINGS);
        }
      },
      (error) => {
        console.error('Settings subscription error:', error);
        if (onError) onError(error);
        else callback(DEFAULT_SETTINGS);
      }
    );
  },

  async saveSettings(settings: Partial<WebsiteSettings>): Promise<void> {
    const data = {
      ...settings,
      updatedAt: new Date().toISOString(),
    };
    try {
      await setDoc(doc(db, SETTINGS_COL, 'website'), data, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `${SETTINGS_COL}/website`);
    }
  },

  // ===========================================
  // MEDIA LIBRARY
  // ===========================================
  async getMediaItems(): Promise<MediaItem[]> {
    try {
      const snapshot = await getDocs(collection(db, MEDIA_COL));
      const list: MediaItem[] = [];
      snapshot.forEach(docSnap => {
        list.push({ id: docSnap.id, ...docSnap.data() } as MediaItem);
      });
      return list.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, MEDIA_COL);
    }
  },

  subscribeMediaItems(callback: (items: MediaItem[]) => void, onError?: (error: unknown) => void) {
    return onSnapshot(
      collection(db, MEDIA_COL),
      (snapshot) => {
        const list: MediaItem[] = [];
        snapshot.forEach(docSnap => {
          list.push({ id: docSnap.id, ...docSnap.data() } as MediaItem);
        });
        callback(list.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()));
      },
      (error) => {
        console.error('Media subscription error:', error);
        if (onError) onError(error);
        else callback([]);
      }
    );
  },

  async uploadMedia(fileDataUrl: string, name: string, folder: MediaFolder): Promise<MediaItem> {
    const id = `med_${Date.now()}`;
    let downloadUrl = fileDataUrl;

    try {
      if (fileDataUrl.startsWith('data:')) {
        const storageRef = ref(storage, `media/${folder}/${id}_${name}`);
        await uploadString(storageRef, fileDataUrl, 'data_url');
        downloadUrl = await getDownloadURL(storageRef);
      }
    } catch (err) {
      console.warn('Storage bucket upload failed, preserving base64 URL directly:', err);
    }

    const item: MediaItem = {
      id,
      name,
      url: downloadUrl,
      folder,
      uploadedAt: new Date().toISOString(),
    };

    try {
      await setDoc(doc(db, MEDIA_COL, id), item);
      return item;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `${MEDIA_COL}/${id}`);
    }
  },

  async deleteMedia(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, MEDIA_COL, id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `${MEDIA_COL}/${id}`);
    }
  }
};
