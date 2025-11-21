import { generateMockId } from "./utils";
import { supabase } from "./supabase";

// --- Types ---
export interface User {
  id: string;
  name: string;
  role: 'student' | 'admin';
  collegeId: string;
  points: number;
  avatar?: string;
  societyId?: string;
  level?: number;
  title?: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  category: 'Cultural' | 'Tech' | 'Sports' | 'Trip' | 'Workshop' | 'Society Interview';
  organizer: string;
  description?: string;
  image?: string;
  attendees: number;
  isHackathon?: boolean;
  prizePool?: string;
  teamSize?: string;
}

export interface Registration {
  eventId: string;
  userId: string;
  timestamp: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  likes: number;
}

export interface Society {
  id: string;
  name: string;
  category: string;
  description: string;
  members: number;
  logo: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
}

export interface ChatContact {
  id: string;
  name: string;
  avatar: string;
  role: string;
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
  online: boolean;
}

export interface Comment {
  id: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  timestamp: string;
}

export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorTitle: string;
  content: string;
  image?: string;
  likes: number;
  comments: Comment[];
  timestamp: string;
  isLiked?: boolean;
}

// --- LocalStorage Persistence Helper ---
const STORAGE_KEY = 'manchx_db_v1';

const DEFAULT_DB = {
  events: [
    {
      id: "1",
      title: "Neon Night: Fresher's Party",
      date: "Oct 25",
      location: "Main Ground",
      category: "Cultural",
      organizer: "Student Council",
      attendees: 450,
      description: "The biggest fresher's party of the year! DJ Night, Food Stalls, and more."
    },
    {
      id: "2",
      title: "Inter-College Hackathon",
      date: "Nov 02",
      location: "Library Block",
      category: "Tech",
      organizer: "CSI Chapter",
      attendees: 120,
      isHackathon: true,
      prizePool: "₹50,000",
      teamSize: "2-4 Members",
      description: "24-hour coding marathon. Build solutions for real-world problems."
    },
    {
      id: "3",
      title: "Manali Winter Trip",
      date: "Dec 15",
      location: "Manali, HP",
      category: "Trip",
      organizer: "Travel Society",
      attendees: 60,
      description: "5 Days, 4 Nights. Bonfire, Trekking, and Snow! Register before seats fill up."
    },
    {
      id: "4",
      title: "Core Team Interviews",
      date: "Oct 30",
      location: "Room 204",
      category: "Society Interview",
      organizer: "Debating Society",
      attendees: 45,
      description: "Recruitment for the core team (2nd & 3rd Year only). Bring your CV."
    }
  ],
  registrations: [] as Registration[],
  projects: [
    {
      id: "p1",
      title: "AI Attendance System",
      description: "Facial recognition based attendance using Python and OpenCV.",
      techStack: ["Python", "OpenCV", "React"],
      githubUrl: "https://github.com/demo/ai-attendance",
      likes: 24
    }
  ],
  societies: [
    {
      id: "soc_1",
      name: "CSI Chapter",
      category: "Tech",
      description: "The Computer Society of India student chapter. We organize hackathons, coding workshops, and tech talks.",
      members: 142,
      logo: "💻"
    },
    {
      id: "soc_2",
      name: "Nritya",
      category: "Cultural",
      description: "The official dance society. Contemporary, Hip-hop, and Classical dance forms.",
      members: 85,
      logo: "💃"
    },
    {
      id: "soc_3",
      name: "Shutterbugs",
      category: "Arts",
      description: "Photography and Videography club. Capturing moments that matter.",
      members: 56,
      logo: "📸"
    }
  ],
  posts: [
    {
      id: "post_1",
      authorId: "u2",
      authorName: "Priya Sharma",
      authorAvatar: "PS",
      authorTitle: "3rd Year • CSE",
      content: "Just won 1st place at the Inter-College Hackathon! 🏆 Huge thanks to my team for pulling off an all-nighter. #Hackathon #Winner #Coding",
      likes: 142,
      comments: [
        { id: "c1", authorName: "Rahul Verma", authorAvatar: "RV", content: "Congratulations! Well deserved.", timestamp: "2h ago" }
      ],
      timestamp: "4h ago",
      image: "https://images.unsplash.com/photo-1504384308090-c54be3855833?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      isLiked: false
    },
    {
      id: "post_2",
      authorId: "u3",
      authorName: "Amit Patel",
      authorAvatar: "AP",
      authorTitle: "Society Head • CSI",
      content: "We are looking for volunteers for the upcoming Tech Fest. If you are interested in event management, DM me! 🚀",
      likes: 56,
      comments: [],
      timestamp: "1d ago",
      isLiked: false
    }
  ],
  messages: [
    { id: "m1", senderId: "stud_1", receiverId: "admin_1", content: "Hi President, I have a query about the hackathon.", timestamp: new Date(Date.now() - 10000000).toISOString() },
    { id: "m2", senderId: "admin_1", receiverId: "stud_1", content: "Sure, go ahead.", timestamp: new Date(Date.now() - 9000000).toISOString() }
  ] as Message[]
};

// Load DB from storage or use default
const getDB = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) return JSON.parse(stored);
  return DEFAULT_DB;
};

// Save DB to storage
const saveDB = (db: any) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
};

// --- API Service ---
export const api = {
  // Auth
  login: async (collegeId: string, role: 'student' | 'admin') => {
    if (supabase) {
      // Real auth logic would go here
    }

    await new Promise(resolve => setTimeout(resolve, 800));
    
    // FIXED IDs for Demo to allow messaging to work between tabs
    let userId = generateMockId();
    let name = "Student User";
    
    if (role === 'student' && (collegeId === '2K21/SE/045' || collegeId === 'DTU2025')) {
        userId = "stud_1"; // Fixed ID for Demo Student
        name = "Demo Student";
    }
    
    if (role === 'admin') {
        if (!collegeId.startsWith('ADMIN')) {
            throw new Error("Invalid Admin ID. Try 'ADMIN/CSI/001'");
        }
        if (collegeId === 'ADMIN/CSI/001') {
            userId = "admin_1"; // Fixed ID for Demo Admin
            name = "CSI President";
        } else {
            name = "Society Admin";
        }
    }

    return {
      id: userId,
      name: name,
      role,
      collegeId,
      points: role === 'student' ? 1250 : 0,
      societyId: role === 'admin' ? "soc_1" : undefined,
      level: 5,
      title: role === 'admin' ? "Society Head" : "Campus Star",
      avatar: role === 'admin' ? "AD" : "ST"
    };
  },

  // Events
  getEvents: async (): Promise<Event[]> => {
    if (supabase) {
       const { data } = await supabase.from('events').select('*');
       if (data) return data as any;
    }
    return getDB().events;
  },

  getHackathons: async (): Promise<Event[]> => {
    const events = getDB().events;
    return events.filter((e: Event) => e.isHackathon);
  },

  createEvent: async (event: Omit<Event, 'id' | 'attendees'>) => {
    const db = getDB();
    const newEvent = { ...event, id: generateMockId(), attendees: 0 };
    db.events = [newEvent, ...db.events];
    saveDB(db);
    return newEvent;
  },

  // Event Registration
  registerForEvent: async (eventId: string, userId: string) => {
    const db = getDB();
    
    // Initialize registrations if not present in old localstorage data
    if (!db.registrations) db.registrations = [];

    // Check if already registered
    const existing = db.registrations.find((r: Registration) => r.eventId === eventId && r.userId === userId);
    if (existing) {
      throw new Error("Already registered for this event");
    }

    // Add registration
    db.registrations.push({
      eventId,
      userId,
      timestamp: new Date().toISOString()
    });

    // Update attendee count
    const eventIndex = db.events.findIndex((e: Event) => e.id === eventId);
    if (eventIndex !== -1) {
      db.events[eventIndex].attendees += 1;
    }

    saveDB(db);
    return true;
  },

  getUserRegistrations: async (userId: string): Promise<string[]> => {
    const db = getDB();
    if (!db.registrations) return [];
    return db.registrations
      .filter((r: Registration) => r.userId === userId)
      .map((r: Registration) => r.eventId);
  },

  // Projects
  getProjects: async () => {
    return getDB().projects;
  },

  addProject: async (project: Omit<Project, 'id' | 'likes'>) => {
    const db = getDB();
    const newProject = { ...project, id: generateMockId(), likes: 0 };
    db.projects = [newProject, ...db.projects];
    saveDB(db);
    return newProject;
  },

  // Societies
  getSocieties: async (): Promise<Society[]> => {
    if (supabase) {
      const { data } = await supabase.from('societies').select('*');
      if (data) return data as any;
    }
    return getDB().societies;
  },

  // Messenger
  getChats: async (role: 'student' | 'admin'): Promise<ChatContact[]> => {
    const db = getDB();
    const allMessages = db.messages;

    if (role === 'student') {
        const lastMsg = allMessages.filter((m: Message) => 
            (m.senderId === 'stud_1' && m.receiverId === 'admin_1') || 
            (m.senderId === 'admin_1' && m.receiverId === 'stud_1')
        ).pop();

        return [{ 
            id: "admin_1", 
            name: "CSI President", 
            avatar: "CP", 
            role: "Society Head", 
            lastMessage: lastMsg ? lastMsg.content : "Start a conversation", 
            lastMessageTime: lastMsg ? new Date(lastMsg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : "", 
            unread: 0, 
            online: true 
        }];
    } else {
        const lastMsg = allMessages.filter((m: Message) => 
            (m.senderId === 'stud_1' && m.receiverId === 'admin_1') || 
            (m.senderId === 'admin_1' && m.receiverId === 'stud_1')
        ).pop();

        return [{ 
            id: "stud_1", 
            name: "Demo Student", 
            avatar: "DS", 
            role: "Student", 
            lastMessage: lastMsg ? lastMsg.content : "No messages yet", 
            lastMessageTime: lastMsg ? new Date(lastMsg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : "", 
            unread: 0, 
            online: true 
        }];
    }
  },

  getMessages: async (currentUserId: string, otherUserId: string): Promise<(Message & { isMine: boolean })[]> => {
    const db = getDB();
    const msgs = db.messages.filter((m: Message) => 
        (m.senderId === currentUserId && m.receiverId === otherUserId) ||
        (m.senderId === otherUserId && m.receiverId === currentUserId)
    );
    
    return msgs.map((m: Message) => ({
        ...m,
        isMine: m.senderId === currentUserId
    }));
  },

  sendMessage: async (senderId: string, receiverId: string, content: string): Promise<Message & { isMine: boolean }> => {
    const db = getDB();
    const newMessage: Message = {
      id: generateMockId(),
      senderId,
      receiverId,
      content,
      timestamp: new Date().toISOString()
    };
    
    db.messages.push(newMessage);
    saveDB(db);
    
    return { ...newMessage, isMine: true };
  },

  // Feed
  getPosts: async (): Promise<Post[]> => {
    return getDB().posts;
  },

  createPost: async (content: string, author: User): Promise<Post> => {
    const db = getDB();
    const newPost: Post = {
      id: generateMockId(),
      authorId: author.id,
      authorName: author.name,
      authorAvatar: author.avatar || "ME",
      authorTitle: author.role === 'admin' ? "Society Admin" : "Student",
      content,
      likes: 0,
      comments: [],
      timestamp: "Just now",
      isLiked: false
    };
    db.posts = [newPost, ...db.posts];
    saveDB(db);
    return newPost;
  },

  likePost: async (postId: string): Promise<void> => {
    const db = getDB();
    const post = db.posts.find((p: Post) => p.id === postId);
    if (post) {
      post.isLiked = !post.isLiked;
      post.likes += post.isLiked ? 1 : -1;
      saveDB(db);
    }
  },

  addComment: async (postId: string, content: string, authorName: string): Promise<Comment> => {
    const db = getDB();
    const post = db.posts.find((p: Post) => p.id === postId);
    const newComment: Comment = {
      id: generateMockId(),
      authorName,
      authorAvatar: "ME",
      content,
      timestamp: "Just now"
    };
    if (post) {
      post.comments.push(newComment);
      saveDB(db);
    }
    return newComment;
  }
};
