// Sources: the user-supplied master brief and the latest matching source PDF,
// Rachamalli_Renusarika_Updated_ML_Projects_CHV_Apps(1).pdf (unchanged in public/resume).
export const identity = {
  fullName: 'Rachamalli Renusarika',
  displayName: 'Renusarika',
  email: 'renusarikarachamalli@gmail.com',
  phone: '+91 74165 97644',
  phoneHref: 'tel:+917416597644',
  role: 'AI / Machine Learning',
  academicStatus: 'Computer Science (CIC) Undergraduate · Class of 2027',
  githubUrl: null as string | null,
  linkedinUrl: null as string | null,
};
export const education = {
  institution: 'Annamacharya Institute of Technology and Sciences, Tirupati',
  program: 'B.Tech · Computer Science and Engineering (CIC)',
  specialization: 'IoT, Cyber Security including Blockchain Technology',
  startYear: 2023,
  expectedYear: 2027,
  cgpa: '8.88',
  status: 'Currently pursuing',
};
export const navigation = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];
export const skills = [
  { name: 'Programming', note: 'The language of a good idea.', items: ['Python', 'Java', 'C', 'SQL', 'JavaScript'] },
  { name: 'Python & ML', note: 'From raw data to meaningful experiments.', items: ['PyTorch', 'scikit-learn', 'NumPy', 'pandas', 'Reinforcement learning', 'Data preprocessing', 'Model evaluation'] },
  { name: 'ML Systems & GPU', note: 'Looking beyond the model itself.', items: ['Mini-batch training', 'Model checkpoints', 'GPU profiling'] },
  { name: 'Java & Backend', note: 'Turning logic into dependable workflows.', items: ['Object-oriented programming', 'JDBC', 'REST APIs', 'CRUD operations'] },
  { name: 'Databases & Tools', note: 'Tools for building, testing and learning.', items: ['MySQL', 'Git / GitHub', 'VS Code', 'Jupyter Notebook', 'Postman'] },
  { name: 'Salesforce / CRM', note: 'Understanding how information moves.', items: ['CRM fundamentals', 'Validation rules', 'Flow', 'Reports', 'Apex / SOQL basics'] },
];
export const projects = [
  {
    slug: 'scheduler',
    title: 'Reinforcement Learning for Intelligent Task Scheduling',
    stack: ['Python', 'PyTorch', 'Gymnasium'],
    summary: 'An exploration of PPO-based scheduling that considers resource availability, workload, and execution priority.',
    problem: 'Choosing the next task means balancing competing priorities with the resources available to run it.',
    approach: 'Developed a reinforcement-learning environment using Proximal Policy Optimization (PPO), with task completion time, resource utilization, and system throughput as evaluation dimensions.',
    metricsExplanation: 'The project evaluates scheduling against traditional approaches. No measured scores were supplied.',
    repositoryUrl: null as string | null,
    demoUrl: null as string | null,
  },
  {
    slug: 'pipeline',
    title: 'GPU-Optimized Deep Learning Training Pipeline',
    stack: ['Python', 'PyTorch', 'CUDA', 'NumPy'],
    summary: 'A training workflow exploring data preparation, mini-batches, checkpoints, and the computing bottlenecks that shape model development.',
    problem: 'Effective training depends on more than architecture. Data movement, memory use, and monitoring influence the whole system.',
    approach: 'Built a pipeline with automated preprocessing, mini-batch training, checkpointing, and performance monitoring. Analyzed GPU memory usage, training speed, and computational bottlenecks.',
    metricsExplanation: 'The illustration explains the workflow; it does not show measured speed-ups or real hardware benchmarks.',
    repositoryUrl: null as string | null,
    demoUrl: null as string | null,
  },
];
export const experience = [
  { number: '01', organization: 'Salesforce CRM Training', role: 'Administrator & Developer Internship', duration: '6 months · Semester 3-2', description: 'Gained exposure to CRM data management, custom objects, field relationships, validation rules, Salesforce Flow, reports, dashboards, and scenario testing.', topics: ['CRM workflows', 'Apex / SOQL basics', 'Data relationships'] },
  { number: '02', organization: 'CHV Apps', role: 'AI & Machine Learning Intern', duration: 'Python-based ML practice', description: 'Explored dataset preprocessing, basic model development, experimentation, testing, and evaluation with Python, NumPy, pandas, and Jupyter Notebook.', topics: ['Data preparation', 'Model experiments', 'Evaluation'] },
];
export const pipelineStages = [
  { name: 'Prepare data', short: 'DATA', detail: 'Clean and transform inputs into a consistent format for training.', color: '#a5ddcb' },
  { name: 'Form mini-batches', short: 'BATCH', detail: 'Organize samples into smaller batches to manage the training workload.', color: '#b8aff7' },
  { name: 'GPU compute', short: 'COMPUTE', detail: 'Run model operations while considering GPU memory and computational cost.', color: '#a5ddcb' },
  { name: 'Monitor training', short: 'MONITOR', detail: 'Observe progress, memory usage, and the time spent in the training loop.', color: '#ead4af' },
  { name: 'Save checkpoints', short: 'SAVE', detail: 'Preserve model state so an experiment can be resumed or inspected.', color: '#b8aff7' },
  { name: 'Review bottlenecks', short: 'REVIEW', detail: 'Examine data flow and resource usage to understand efficiency and scalability.', color: '#a5ddcb' },
];
export const schedulerBeats = ['Read the queue', 'Consider the policy', 'Route to resources', 'Observe the outcome'];
export const resume = {
  // Drop the real PDF at this location. The build detects it automatically.
  expectedPath: '/resume/Rachamalli_Renusarika_Resume.pdf',
};
export const resumeFiles = import.meta.glob('/public/resume/*.pdf', { eager: true, query: '?url', import: 'default' });
export const resumeAvailable = Object.keys(resumeFiles).some(path => path.endsWith('/Rachamalli_Renusarika_Resume.pdf'));
