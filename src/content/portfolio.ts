// Facts follow the supplied rebuild brief and the original, available resume PDF.
// Add only verified public profiles / project URLs; null fields are not rendered.
export const profile = {
  name: 'Rachamalli Renusarika',
  wordmark: 'Renusarika',
  status: 'Computer Science undergraduate',
  graduation: 'Expected graduation 2027',
  intro: 'I’m interested in how machine-learning systems make decisions and how to make model training more efficient.',
  email: 'renusarikarachamalli@gmail.com',
  github: null as string | null,
  linkedin: null as string | null,
  resume: `${import.meta.env.BASE_URL}resume/Rachamalli_Renusarika_Resume.pdf`,
  about: 'I’m pursuing a B.Tech in Computer Science and Engineering (CIC) at Annamacharya Institute of Technology and Sciences, Tirupati. My current interests are reinforcement learning, model training, and efficient software systems.',
  education: {
    degree: 'B.Tech · Computer Science and Engineering (CIC)',
    years: '2023–2027 (expected)',
    cgpa: '8.88/10',
    specialization: 'IoT, Cyber Security including Blockchain Technology',
  },
  toolkit: ['Python', 'PyTorch', 'NumPy', 'pandas', 'Java', 'C', 'SQL', 'Git'],
};

export const projects = {
  scheduling: {
    title: 'Reinforcement Learning for Intelligent Task Scheduling',
    description: 'I built a scheduling environment that considers resource availability, workload, and task priority. I trained a Proximal Policy Optimization (PPO) agent and compared it with traditional scheduling methods using task completion time, resource utilization, and throughput.',
    stack: ['Python', 'PyTorch', 'Gymnasium'],
    source: null as string | null,
    demo: null as string | null,
  },
  training: {
    title: 'GPU-Optimized Deep Learning Training Pipeline',
    description: 'I built a training pipeline with automated data preprocessing, mini-batch training, checkpointing, and performance monitoring. I examined GPU memory use, training speed, and bottlenecks to understand where the workflow could be improved.',
    stack: ['Python', 'PyTorch', 'CUDA', 'NumPy'],
    source: null as string | null,
    demo: null as string | null,
  },
};

export const stages = [
  { name: 'Data prep', detail: 'Prepare consistent inputs for the training process.' },
  { name: 'Mini-batches', detail: 'Group samples into manageable batches for training.' },
  { name: 'GPU training', detail: 'Run model operations while examining memory use and training speed.' },
  { name: 'Monitoring', detail: 'Observe the workflow to locate computational bottlenecks.' },
  { name: 'Checkpoints', detail: 'Save model state so an experiment can be resumed or reviewed.' },
];

export const experiences = [
  { role: 'AI & Machine Learning Intern', organization: 'CHV Apps', duration: null, description: 'Explored Python-based data preparation, model experiments, and evaluation with NumPy, pandas, and Jupyter.' },
  { role: 'Salesforce Administrator & Developer Internship', organization: 'Salesforce CRM training', duration: 'Six months · Semester 3-2', description: 'Practiced CRM data management, validation rules, Salesforce Flow, reporting, and basic Apex and SOQL.' },
];

export const photos = {
  hero: { alt: 'Renusarika in a white blouse, seated for a portrait', width: 816, height: 1074 },
  about: { alt: 'Renusarika outdoors in a purple and turquoise outfit', width: 721, height: 1280 },
  contact: { alt: 'Renusarika seated on steps in a black and gold outfit', width: 720, height: 1280 },
};
export type PhotoRole = keyof typeof photos;
