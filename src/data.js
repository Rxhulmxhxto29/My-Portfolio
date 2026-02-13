export const portfolioData = {
    name: "Rahul Mahato",
    role: "Software Engineer | AI/ML | Full Stack",
    location: "Bengaluru, Karnataka",
    email: "msrrahulmahato@gmail.com",
    phone: "+91 9113828502",
    linkedIn: "https://www.linkedin.com/in/rahul-mahato-0b1534254",
    github: "https://github.com/Rxhulmxhxto29",
    headline: "Architecting intelligent systems at the intersection of AI and Full-Stack Engineering.",
    objective: "Enthusiastic engineering student with strong skills in Python, Java, and Full Stack. Proficient in building intelligent applications using AI/ML (TensorFlow, PyTorch) and robust web solutions.",
    about: "I am a research-oriented software engineer driven by product thinking and an engineering mindset. I specialize in building high-performance applications, from low-latency Android native audio processing to AI-powered analytical systems. My focus is on solving complex problems with scalable architecture and elegant user experiences.",

    education: [
        {
            degree: "Bachelor of Engineering in Computer Science and Design",
            institution: "Atria Institute Of Technology",
            location: "Bangalore",
            period: "2022 – 2026",
            metrics: "8.7 CGPA",
            courses: ["Data Structures", "Database Management Systems", "Artificial Intelligence", "Object-Oriented Programming"]
        },
        {
            degree: "Pre-University College",
            institution: "Seshadripuram Composite PU College",
            location: "Bangalore",
            period: "2020 – 2022",
            metrics: "82.33%",
            courses: ["Physics", "Chemistry", "Mathematics", "Computer Science"]
        }
    ],

    skills: [
        {
            category: "Cybersecurity & Forensics",
            items: ["Ethical Hacking", "Vulnerability Assessment", "Digital Forensics", "CNN Models", "Image Processing"]
        },
        {
            category: "Programming & Core",
            items: ["Java", "Python", "JavaScript", "C/C++", "SQL", "DSA", "OOP", "DBMS", "System Thinking"]
        },
        {
            category: "Web & Frameworks",
            items: ["React.js", "Node.js", "Flutter", "HTML5", "CSS3", "REST APIs", "FastAPI"]
        },
        {
            category: "AI/ML & Data Science",
            items: ["NLP", "TensorFlow", "PyTorch", "Hugging Face", "LLMs", "Streamlit", "Data Analytics"]
        },
        {
            category: "Database & DevOps",
            items: ["MongoDB", "PostgreSQL", "MySQL", "Docker", "Git"]
        },
        {
            category: "Tools & Design",
            items: ["Figma", "Canva", "VS Code", "Excel", "Google Spreadsheets"]
        },
        {
            category: "Soft Skills",
            items: ["Leadership", "Project Management", "Strategic Thinking", "Product Management", "Marketing", "Community Building"]
        }
    ],

    projects: [
        {
            id: "hearing-aid",
            title: "Feature-Rich Hearing Aid App",
            description: "A low-latency (~3ms) Android hearing aid app with real-time audio capture and parametric EQ filtering.",
            tech: ["Kotlin", "Android NDK (C++)", "Oboe Audio", "DSP", "JNI"],
            metrics: "~3ms Latency | Android NDK",
            architectureDiagram: [
                { label: "Microphone Input", icon: "🎤", desc: "Raw PCM Capture (AAudio)" },
                { label: "JNI Bridge", icon: "🔗", desc: "Kotlin ↔ C++ Memory Map" },
                { label: "Ring Buffer", icon: "🔄", desc: "Lock-free Circular Queue" },
                { label: "DSP Engine", icon: "⚙️", desc: "C++ Biquad IIR Filters" },
                { label: "Speaker Output", icon: "🔊", desc: "Direct Hardware Write" }
            ],
            caseStudy: [
                {
                    title: "1️⃣ Problem Statement",
                    content: "Standard hearing aid Android apps suffer from high audio latency (>150ms) due to the Java Audio Stack. This delay creates a disorienting 'echo' effect for users (the 'Comb Filtering' effect), where they hear direct sound before the processed sound. To be usable, a hearing aid must achieve <10ms round-trip latency."
                },
                {
                    title: "2️⃣ Constraints & Challenges",
                    content: [
                        "Latency Budget: Total round-trip time (Input → Process → Output) had to be strictly under 10ms.",
                        "Hardware Variability: Must support various Android devices with different audio drivers and sampling rates.",
                        "Resource Constraints: Real-time DSP had to run on standard mobile CPUs without draining battery or causing thermal throttling.",
                        "OS Jitter: Android’s garbage collection (GC) pauses can interrupt audio streams, causing glitches."
                    ]
                },
                {
                    title: "3️⃣ Architecture & Design Decisions",
                    content: [
                        "Bypassed Java Audio Stack: Used Android NDK (C++) and Oboe API to access the AAudio hardware buffer directly, avoiding VM overhead.",
                        "Double Buffering: Implemented a lock-free ring buffer to exchange audio data between the input and output callbacks safely.",
                        "Data-Oriented Design: Wrote the parametric EQ algorithm in pure C++ using contiguous memory arrays to maximize CPU cache coherence."
                    ]
                },
                {
                    title: "4️⃣ Trade-Offs Considered",
                    content: [
                        "Java vs. C++: Java is easier to maintain but has unpredictable GC pauses. I chose C++ (NDK) for deterministic performance, accepting the higher complexity and debugging difficulty.",
                        "FFT vs. Time-Domain Filters: A Fast Fourier Transform (FFT) allows complex spectral editing but introduces windowing latency. I chose Time-Domain Biquad IIR filters because they have near-zero latency, which was critical for this use case."
                    ]
                },
                {
                    title: "5️⃣ Implementation Highlights",
                    content: [
                        "Custom JNI Bridge: Built a lightweight JNI layer to control C++ audio engine parameters (Gain, Q-factor) from the Kotlin UI in real-time.",
                        "SIMD Optimization: (Planned) Leveraging ARM NEON instructions to vectorise audio processing loops for 4x throughput."
                    ]
                },
                {
                    title: "6️⃣ Impact & Results",
                    content: [
                        "Achieved ~3ms round-trip latency on Pixel devices (well within the 10ms target).",
                        "Eliminated the 'echo' effect, making the app usable for real-world conversation.",
                        "Delivered a smooth 60fps UI in Kotlin that remains responsive even under high audio load."
                    ]
                }
            ],
            engineeringDecisions: [
                {
                    decision: "Bypassed standard Android Audio (Java) for Oboe (C++)",
                    rationale: "Java Garbage Collection introduces random 50ms+ pauses. AAudio (via Oboe) offers deterministic, exclusive-mode hardware access."
                },
                {
                    decision: "Lock-free Ring Buffer for Thread Safety",
                    rationale: "Mutex locks in the audio callback cause priority inversion and glitches. A lock-free circular buffer ensures the high-priority audio thread never waits."
                },
                {
                    decision: "IIR Biquad Filters over FFT",
                    rationale: "FFT processing window adds ~20ms latency. IIR filters operate sample-by-sample (<0.1ms), essential for lip-sync perfection."
                }
            ],
            futureImprovements: [
                "Implement SIMD (ARM NEON) vectorization to process 4 samples per CPU cycle.",
                "Add Adaptive Feedback Cancellation using LMS algorithm to stop squealing.",
                "Support Bluetooth LE Audio (LC3 codec) for wireless low-latency transmission."
            ],
            debugStory: {
                title: "The Ghostly Crackling on Samsung Devices",
                problem: "Audio was perfect on Pixel phones but had periodic crackling/dropouts on Samsung devices.",
                diagnosis: "Used Systrace and found the audio thread was being preempted by Samsung's aggressive dynamic power management.",
                fix: "Explicitly set thread affinity to the 'Performance' cores and acquired a partial WakeLock during active sessions.",
                result: "Zero dropouts across all tested vendors."
            }
        },
        {
            id: "plagiarism-detection",
            title: "AI Plagiarism Detection System",
            description: "Advanced NLP-based system for detecting technical plagiarism in research papers, presented at IEEE ICKECS 2025.",
            tech: ["Python", "Transformers (BERT)", "SpaCy", "React", "Flask"],
            metrics: "IEEE Publication | 95% Accuracy",
            architectureDiagram: [
                { label: "PDF Upload", icon: "📄", desc: "React Frontend" },
                { label: "Text Extraction", icon: "📝", desc: "PyPDF2 + Cleaning" },
                { label: "TF-IDF Filter", icon: "🔍", desc: "Initial Relevance Check" },
                { label: "BERT Embeddings", icon: "🧠", desc: "Vectorization" },
                { label: "Cosine Similarity", icon: "📊", desc: "Semantic Matching" }
            ],
            caseStudy: [
                {
                    title: "1️⃣ Problem Statement",
                    content: "Traditional plagiarism checkers (like Turnitin) largely rely on n-gram or string matching. They fail to detect 'smart plagiarism' where ideas are paraphrased, localized sentence structures are changed, or synonyms are swapped, especially in technical research papers."
                },
                {
                    title: "2️⃣ Constraints & Challenges",
                    content: [
                        "Semantic Understanding: The system needed to ‘understand’ context, not just match words.",
                        "Scalability: Processing large multi-page PDF research papers requires significant compute power.",
                        "False Positives: Technical terms (e.g., 'React.useEffect') appear frequently and shouldn't be flagged as plagiarism."
                    ]
                },
                {
                    title: "3️⃣ Architecture & Design Decisions",
                    content: [
                        "Two-Stage Pipeline: First, a lightweight TF-IDF step filters unrelated documents. Second, a heavy Transformer-based model performs deep semantic analysis on candidates.",
                        "Embedding-Based Comparison: Used Sentence-BERT to generate high-dimensional vector embeddings of text chunks. Plagiarism is detected by calculating Cosine Similarity between vectors."
                    ]
                },
                {
                    title: "4️⃣ Trade-Offs Considered",
                    content: [
                        "Full BERT vs. DistilBERT: Full BERT is more accurate but slow. I chose DistilBERT for production to reduce inference time by 40% with minimal accuracy loss.",
                        "Cloud vs. Local Inference: Deployed the model on a GPU-enabled backend server rather than client-side to handle the heavy matrix computations."
                    ]
                },
                {
                    title: "5️⃣ Implementation Highlights",
                    content: [
                        "Text Preprocessing Pipeline: Built a custom Cleaner in SpaCy to remove stop words, citations, and mathematical formulas which introduce noise.",
                        "Chunking Strategy: Implemented overlapping sliding window chunking to ensure context isn't lost at sentence boundaries."
                    ]
                },
                {
                    title: "6️⃣ Impact & Results",
                    content: [
                        "Accurately detected paraphrased plagiarism with 95% success rate on a test dataset of technical papers.",
                        "Research paper on this system was accepted and published at IEEE ICKECS 2025.",
                        "Reduced manual review time for professors by highlighting specific semantic matches."
                    ]
                }
            ],
            engineeringDecisions: [
                {
                    decision: "Two-Stage Filtering (TF-IDF → BERT)",
                    rationale: "Running BERT on every document is O(N) cost prohibitive. Simple TF-IDF quickly eliminates 90% of non-matches, reserving expensive GPUs for likely candidates."
                },
                {
                    decision: "DistilBERT over BERT-Large",
                    rationale: "BERT-Large offers only ~2% better accuracy but requires 3x inference time. DistilBERT fits within the latency budget of an interactive webapp."
                },
                {
                    decision: "Overlapping Sliding Windows",
                    rationale: "Fixed-size chunks split sentences mid-thought. A 10% overlap ensures context isn't lost at arbitrary boundaries."
                }
            ],
            futureImprovements: [
                "Integrate Common Crawl dataset for internet-wide search capability (currently local DB only).",
                "Add 'Obfuscation Detection' to flag deliberate character swapping (e.g., Cyrillic 'a' vs Latin 'a').",
                "Containerize the inference engine with Docker/TensorRT for scalable cloud deployment."
            ],
            debugStory: {
                title: "OOM Killers on Large PDFs",
                problem: "Server crashed with Out Of Memory errors when processing thesis papers >50 pages.",
                diagnosis: "Profiling showed we were loading the entire PDF text + multiple embedding copies into RAM simultaneously.",
                fix: "Refactored the pipeline to use Python Generators, streaming text chunks lazily through the model.",
                result: "Memory usage dropped by 80%, consistently processing 500MB+ files on 8GB RAM."
            }
        },
        {
            id: "edutrack",
            title: "EduTrack: Smart Study Manager",
            description: "A comprehensive study management platform for tracking academic progress and scheduling.",
            tech: ["React.js", "Node.js", "MongoDB", "Express", "Redux", "JWT"],
            metrics: "IO Intensive | Auth Integration",
            caseStudy: [
                {
                    title: "1️⃣ Problem Statement",
                    content: "University students struggle to correlate their study habits with academic performance. Disparate tools for scheduling, assignment tracking, and grade monitoring lead to fragmented data and poor time management."
                },
                {
                    title: "2️⃣ Constraints & Challenges",
                    content: [
                        "Data Consistency: Ensuring the frontend schedule stays in sync with backend updates in real-time.",
                        "Security: Protecting sensitive student grade data and personal schedules.",
                        "Scalability: Designing a schema that can handle thousands of assignment entries per user without degradation."
                    ]
                },
                {
                    title: "3️⃣ Architecture & Design Decisions",
                    content: [
                        "MERN Stack: Chosen for its unified JavaScript ecosystem, allowing code sharing between frontend and backend.",
                        "Redux Toolkit: Centralized state management to handle complex UI states (e.g., toggling between calendar and list views) without prop drilling.",
                        "RESTful API: Structured endpoints for predictable resource management (GET /assignments, POST /grades)."
                    ]
                },
                {
                    title: "4️⃣ Trade-Offs Considered",
                    content: [
                        "SQL (PostgreSQL) vs. NoSQL (MongoDB): Selected MongoDB for its flexible schema, allowing easy updates to the 'Assignment' data model as features evolved.",
                        "Context API vs. Redux: Chose Redux despite the boilerplate because the app required frequent state updates across disjoint components."
                    ]
                },
                {
                    title: "5️⃣ Implementation Highlights",
                    content: [
                        "JWT Authentication: Implemented stateless authentication with HTTP-only cookies to prevent XSS attacks.",
                        "Aggregated Dashboard: Used MongoDB Aggregation Pipelines to calculate GPA and completion percentages on the server side, reducing frontend computation."
                    ]
                },
                {
                    title: "6️⃣ Impact & Results",
                    content: [
                        "Delivered a functional CRUD tracking system with secure login.",
                        "Reduced time spent organizing assignments by ~40% for beta users.",
                        "Demonstrated full-stack proficiency including database design, API security, and state management."
                    ]
                }
            ],
            engineeringDecisions: [
                {
                    decision: "HTTP-Only Cookies for JWT",
                    rationale: "Storing tokens in LocalStorage makes them vulnerable to XSS. HTTP-Only cookies prevent client-side scripts from accessing auth credentials."
                },
                {
                    decision: "Server-Side Aggregations (MongoDB)",
                    rationale: "Calculating GPA and stats on the frontend is slow and reveals raw data. Aggregation Pipelines offload this math to the DB engine."
                },
                {
                    decision: "Redux Toolkit for State",
                    rationale: "Prop-drilling auth state 5 levels deep was unmaintainable. Redux provides a single source of truth for 'User' and 'Session'."
                }
            ],
            futureImprovements: [
                "Implement Redis caching for the dashboard endpoints to reduce DB load.",
                "Add Real-time implementation (Socket.io) for study group notifications.",
                "Create an iCal/Google Calendar export feature for interoperability."
            ],
            debugStory: {
                title: "The Case of the Disappearing Session",
                problem: "Users were randomly logged out exactly 1 hour after login, losing unsaved form data.",
                diagnosis: "The JWT expiry was hardcoded to 1h, but the frontend had no logic to handle graceful renewal.",
                fix: "Implemented an Axios interceptor to catch 401 errors, attempt a silent token refresh, and retry the original request transparently.",
                result: "Seamless user experience with secure short-lived access tokens."
            }
        },
        {
            id: "ai-tracefinder",
            title: "AI TraceFinder (Infosys)",
            description: "AI-driven pattern detection system developed during internship at Infosys.",
            tech: ["Python", "Scikit-learn", "Pandas", "Matplotlib"],
            metrics: "Infosys Internship Project | Automated Analysis",
            caseStudy: [
                {
                    title: "1️⃣ Problem Statement",
                    content: "In large-scale enterprise systems, manual log analysis for detecting anomalies or tracing transaction failures is extremely time-consuming and error-prone due to the sheer volume of data."
                },
                {
                    title: "2️⃣ Constraints & Challenges",
                    content: [
                        "Data Volume: Processing gigabytes of log data efficiently.",
                        "Noise: Distinguishing actionable anomalies from benign system jitter.",
                        "False Negatives: Critical that the system does not miss genuine error patterns."
                    ]
                },
                {
                    title: "3️⃣ Architecture & Design Decisions",
                    content: [
                        "Pipeline Architecture: Built a modular pipeline (Ingest → Clean → Feature Extract → Predict) to ensure reproducibility.",
                        "Random Forest Classifier: Selected for its robustness against overfitting and ability to handle high-dimensional data better than simple linear models.",
                        "Pandas & NumPy: Leveraged vectorization for efficient memory management during data preprocessing."
                    ]
                },
                {
                    title: "4️⃣ Trade-Offs Considered",
                    content: [
                        "Deep Learning vs. ML: Deep Learning (RNNs) was considered for sequence modeling but deemed overkill. Traditional ML (Random Forest) provided better interpretability, which was crucial for debugging the root causes."
                    ]
                },
                {
                    title: "5️⃣ Implementation Highlights",
                    content: [
                        "Feature Engineering: Created custom features like 'time-since-last-error' and 'burst-rate' to capture temporal patterns in logs.",
                        "Automated Reporting: Integrated Matplotlib to generate visual dashboards summarizing detected anomalies."
                    ]
                },
                {
                    title: "6️⃣ Impact & Results",
                    content: [
                        "Reduced manual log inspection time by approximately 60%.",
                        "Successfully identified obscure error patterns missed by manual review.",
                        "Validated the use of ML for IT Operations (AIOps) within the internship scope."
                    ]
                }
            ],
            engineeringDecisions: [
                {
                    decision: "Random Forest over Deep Learning (LSTM)",
                    rationale: "LSTMs are powerful but 'black boxes'. Ops teams needed to know WHY a log was flagged (e.g., 'burst rate > threshold'). RF provides feature importance."
                },
                {
                    decision: "Vectorized Preprocessing (Pandas)",
                    rationale: "Iterating through rows in Python is too slow for GB-scale logs. Vectorized operations pushed work to C-level optimizations."
                }
            ],
            futureImprovements: [
                "Transition from Batch Processing to Stream Processing using Kafka.",
                "Implement a 'Human-in-the-loop' feedback mechanism to retrain on false positives.",
                "Cluster similar anomalies to reduce alert fatigue for Ops teams."
            ],
            debugStory: {
                title: "Model Drift and The False Alarm Storm",
                problem: "After 2 weeks of good performance, the model started flagging normal system updates as critical errors.",
                diagnosis: "The training data didn't include logs from the new software version 'v2.1', causing Concept Drift.",
                fix: "Implemented an 'Unknown Token' handler and a weekly automated retraining pipeline on verified examples.",
                result: "Maintained >90% precision even after system upgrades."
            }
        },
        {
            id: "mental-health",
            title: "Mental Health Tracker",
            description: "A fitness and mental wellbeing tracker using supervised learning (Random Forest).",
            tech: ["Python", "Random Forest", "Streamlit", "Scikit-learn"],
            metrics: "Predictive Analytics | Streamlit",
            caseStudy: [
                {
                    title: "1️⃣ Problem Statement",
                    content: "Mental health is often treated reactively. Users lack tools to proactively understand how their daily habits (sleep, exercise, work) correlate with their mood and stress levels."
                },
                {
                    title: "2️⃣ Constraints & Challenges",
                    content: [
                        "Small Dataset: Initial user data is sparse, making model training difficult.",
                        "Subjectivity: 'Mood' is a subjective metric, leading to noisy labels.",
                        "Privacy: Health data is sensitive and must be handled carefully."
                    ]
                },
                {
                    title: "3️⃣ Architecture & Design Decisions",
                    content: [
                        "Streamlit Frontend: Chosen for rapid prototyping of data-heavy interfaces without writing complex HTML/JS.",
                        "Supervised Learning: Modeled the problem as a classification task (Stress Level: Low/Medium/High) based on input features.",
                        "Persistency: Used simple CSV/local storage for the prototype to avoid complex DB setup constraints."
                    ]
                },
                {
                    title: "4️⃣ Trade-Offs Considered",
                    content: [
                        "Mobile App vs. Web Dashboard: A mobile app is better for tracking, but a Web Dashboard (Streamlit) allowed for faster iteration on the ML model visualization.",
                        "Complex Models vs. Simple Trees: Stuck to Decision Trees/Random Forest for explainability ('You are stressed because sleep < 4 hours')."
                    ]
                },
                {
                    title: "5️⃣ Implementation Highlights",
                    content: [
                        "Interactive Inputs: Built sliders and forms for easy daily logging.",
                        "Real-time Inference: Model retrains/predicts instantly as users adjust input parameters to show 'what-if' scenarios."
                    ]
                },
                {
                    title: "6️⃣ Impact & Results",
                    content: [
                        "Created a functional prototype for correlating lifestyle metrics with mental wellbeing.",
                        "Demonstrated the application of supervised learning in the health-tech domain.",
                        "Visualized complex correlations in an accessible, user-friendly format."
                    ]
                }
            ],
            engineeringDecisions: [
                {
                    decision: "Streamlit for Frontend",
                    rationale: "Developing a React frontend would take 2 weeks. Streamlit allowed deploying a data-interactive UI in 2 days, prioritizing ML iteration."
                },
                {
                    decision: "Classification over Regression",
                    rationale: "Predicting exact stress scores (e.g., '72.4') is false precision. Bucketing into 'Low/Med/High' is more actionable for users."
                }
            ],
            futureImprovements: [
                "Integrate with Wearable APIs (Google Fit/Apple Health) for automated data entry.",
                "Implement Linear Regression to predict future stress trends based on history.",
                "Encrypt local data storage to ensure user privacy compliance."
            ],
            debugStory: {
                title: "Overfitting on Small Data",
                problem: "The model gave 100% accuracy on training data but failed randomly on new inputs.",
                diagnosis: "With only 50 records, the Random Forest was memorizing the data (Overfitting).",
                fix: "Reduced tree depth and implemented K-Fold Cross Validation to ensure generalizability.",
                result: "Accuracy stabilized at a realistic 82% on unseen data."
            }
        },
        {
            id: "solar-system",
            title: "3D Interactive Solar System",
            description: "A visually stunning 3D simulation of the solar system using web technologies.",
            tech: ["HTML5", "CSS3", "JavaScript", "Three.js (Concept)", "CSS3D"],
            metrics: "60 FPS Animation | Interactive 3D",
            caseStudy: [
                {
                    title: "1️⃣ Problem Statement",
                    content: "Astronomy concepts like orbital mechanics and scale are hard to visualize with static 2D images. Users struggle to grasp the relative speeds and distances of planets."
                },
                {
                    title: "2️⃣ Constraints & Challenges",
                    content: [
                        "Performance: Rendering multiple orbiting bodies with lighting effects must maintain 60 FPS on standard browsers.",
                        "Responsiveness: The 3D scene must handle resizing across mobile and desktop screens."
                    ]
                },
                {
                    title: "3️⃣ Architecture & Design Decisions",
                    content: [
                        "CSS3 Transformations: Utilized hardware-accelerated CSS transforms (translate3d, rotate3d) for smooth orbital animations without the heavy overhead of a full WebGL engine for this specific iteration.",
                        "Heliocentric Coordinate System: Calculated positions relative to the sun center `(0,0,0)` to simplify orbital math."
                    ]
                },
                {
                    title: "4️⃣ Trade-Offs Considered",
                    content: [
                        "WebGL (Three.js) vs. CSS3D: WebGL offers better lighting/shading, but CSS3D is lighter weight and integrates better with standard DOM elements for text labels. Chosen CSS/JS for purity and performance demonstration."
                    ]
                },
                {
                    title: "5️⃣ Implementation Highlights",
                    content: [
                        "Animation Loop: Used `requestAnimationFrame` instead of `setInterval` for smoother, battery-efficient rendering.",
                        "Responsive Scaling: Used `calc()` and viewport units (`vw`, `vh`) to ensure planets remain proportional on different screens."
                    ]
                },
                {
                    title: "6️⃣ Impact & Results",
                    content: [
                        "Developed a buttery-smooth, interactive educational tool.",
                        "Learned the fundamentals of 3D graphics, matrix transformations, and browser rendering pipelines.",
                        "Achieved a high visual fidelity 'Wow' factor for the portfolio."
                    ]
                }
            ],
            engineeringDecisions: [
                {
                    decision: "CSS3 `transform: translate3d`",
                    rationale: "Forces GPU acceleration (Composite Layer), avoiding expensive CPU layout repaints on every frame."
                },
                {
                    decision: "RequestAnimationFrame Loop",
                    rationale: "Using `setInterval` causes jank if frames take >16ms. rAF syncs with the monitor's refresh rate for buttery smooth motion."
                }
            ],
            futureImprovements: [
                "Migrate to Three.js/WebGL for realistic lighting and shadows.",
                "Add 'Time Travel' slider to view planetary alignment on specific dates.",
                "Implement pinch-to-zoom and touch gestures for mobile interaction."
            ],
            debugStory: {
                title: "The Wobbling Orbits",
                problem: "Planets drifted off their elliptical paths after a few minutes of animation.",
                diagnosis: "Cumulative floating-point errors in the position calculation were stacking up over time.",
                fix: "Recalculated position from `t=0` using absolute time deltas instead of incremental updates.",
                result: "Perfectly stable orbits indefinitely."
            }
        },
        {
            id: "nlp-chatbot",
            title: "Conversational NLP Chatbot",
            description: "Intelligent chatbot leveraging NLP techniques to understand and respond to user inputs.",
            tech: ["Python", "NLTK", "SpaCy", "TensorFlow", "WebSocket"],
            metrics: "Intent Classification | <200ms Response",
            caseStudy: [
                {
                    title: "1️⃣ Problem Statement",
                    content: "Static FAQ bots (Rule-based) are frustrating because they break whenever a user deviates from the exact script. Users expect a conversational interface that understands intent even with typos or varied phrasing."
                },
                {
                    title: "2️⃣ Constraints & Challenges",
                    content: [
                        "Ambiguity: Users often ask \"How much?\" which could refer to price, quantity, or duration depending on context.",
                        "Latency: Chat interfaces must feel instant (<200ms response time).",
                        "Training Data: Limited labelled dataset for custom domain queries."
                    ]
                },
                {
                    title: "3️⃣ Architecture & Design Decisions",
                    content: [
                        "Intent Classification Model: Trained a simple Feed-Forward Neural Network (BOW approach) to classify user input into intents (e.g., 'book_flight', 'check_status').",
                        "Entity Extraction: Used SpaCy NER (Named Entity Recognition) to pull out dates, locations, and names from the query.",
                        "State Management: Implemented a Context Object passed between turns to handle multi-turn conversations."
                    ]
                },
                {
                    title: "4️⃣ Trade-Offs Considered",
                    content: [
                        "Generative (LLM) vs. Retrieval: LLMs (like GPT) are powerful but can hallucinate. I chose a Retrieval-based Intent model for business reliability and deterministic responses.",
                        "WebSocket vs. REST: Switched from REST polling to WebSockets to support real-time bi-directional typing indicators."
                    ]
                },
                {
                    title: "5️⃣ Implementation Highlights",
                    content: [
                        "Stemming & Lemmatization: Aggressive text normalization using NLTK to reduce vocabulary size and improve model generalization on small data.",
                        "Confidence Thresholding: Implemented a fallback logic ('I didn't quite get that') if model confidence score is below 75%."
                    ]
                },
                {
                    title: "6️⃣ Impact & Results",
                    content: [
                        "Handled 80% of common queries without human intervention.",
                        "Natural Language Understanding allows users to speak freely rather than clicking menu buttons.",
                        "Zero-dependency deployment optimized for low-resource environments."
                    ]
                }
            ],
            engineeringDecisions: [
                {
                    decision: "Retrieval-Based Intent Model",
                    rationale: "Clients need 100% accurate, approved answers. Generative models risk hallucinations unsuitable for customer service."
                },
                {
                    decision: "WebSockets for Transport",
                    rationale: "Polling REST APIs kills mobile battery and adds latency. WebSockets provide a persistent, real-time bidirectional channel."
                }
            ],
            futureImprovements: [
                "Implement 'Fuzzy Matching' for better typo tolerance.",
                "Add voice-to-text input support.",
                "Integrate with a real backend DB to perform actions (e.g., actually booking the ticket)."
            ],
            debugStory: {
                title: "Context Loss in Multi-turn Conversations",
                problem: "Bot forgot user details (like name/date) when switching between topics.",
                diagnosis: "The state object was being reset on every new Intent match.",
                fix: "Implemented a 'Session Manager' in Redis to persist context variables across the entire conversation lifespan.",
                result: "Seamless multi-turn dialogs."
            }
        },
        {
            id: "hospital-system",
            title: "Hospital Management Suite",
            description: "Fully interactive web-based system with analytics dashboard and appointment management.",
            tech: ["Vanilla JS", "HTML5", "CSS3", "LocalStorage", "Chart.js"],
            metrics: "Zero-Dependency | Vanilla JS Architecture",
            caseStudy: [
                {
                    title: "1️⃣ Problem Statement",
                    content: "Small clinics often rely on paper records or expensive enterprise software. They need a lightweight, zero-setup digital solution for managing patient records and appointments."
                },
                {
                    title: "2️⃣ Constraints & Challenges",
                    content: [
                        "No Backend Required: The requirement was a standalone client-side app that works offline.",
                        "Data Persistence: Data must survive page reloads without a server database.",
                        "Complex State: Managing relationships between Patients, Doctors, and Appointments using only JavaScript objects."
                    ]
                },
                {
                    title: "3️⃣ Architecture & Design Decisions",
                    content: [
                        "LocalStorage 'Database': Architected a custom ORM-like layer to interact with the browser's LocalStorage, handling serialization (JSON.stringify) and parsing automatically.",
                        "MVC Pattern: Manually implemented a Model-View-Controller structure to keep the UI code separate from the data logic."
                    ]
                },
                {
                    title: "4️⃣ Trade-Offs Considered",
                    content: [
                        "React vs. Vanilla JS: Chose Vanilla JS to master the fundamentals of DOM manipulation and state management before relying on frameworks.",
                        "IndexedDB vs. LocalStorage: LocalStorage is synchronous and blocking, but for the small dataset (<5MB) of a demo app, its simplicity outweighed the async complexity of IndexedDB."
                    ]
                },
                {
                    title: "5️⃣ Implementation Highlights",
                    content: [
                        "Dynamic DOM Generation: Wrote helper functions to render table rows and cards dynamically from data arrays.",
                        "Chart.js Integration: Connected the dashboard directly to the data layer to provide real-time visualization of patient trends."
                    ]
                },
                {
                    title: "6️⃣ Impact & Results",
                    content: [
                        "Built a fully persistent CRUD application without any server-side dependence.",
                        "Demonstrated deep understanding of core JavaScript concepts (ES6+, DOM, Storage API).",
                        "Created a responsive, dashboard-style UI from scratch."
                    ]
                }
            ],
            engineeringDecisions: [
                {
                    decision: "Custom ORM for LocalStorage",
                    rationale: "Direct `setItem` calls are messy. A wrapper class centralized serialization, error handling, and schema validation."
                },
                {
                    decision: "MVC Architecture (Manual)",
                    rationale: "Without a framework, spaghetti code is inevitable. Enforcing Model-View-Controller separation ensured the codebase remained scalable and testable."
                }
            ],
            futureImprovements: [
                "Migrate to IndexedDB to support larger datasets.",
                "Turn it into a PWA (Progressive Web App) for full offline installability.",
                "Add CSV Export so clinics can back up their data."
            ],
            debugStory: {
                title: "UI Freeze on Bulk Deletes",
                problem: "Deleting 50 records at once froze the browser for 2 seconds.",
                diagnosis: "The DOM was being repainted for *each* row deletion.",
                fix: "Batched the DOM updates into a single `DocumentFragment` and committed them in one go.",
                result: "Instant bulk operations."
            }
        },
        {
            id: "eventhub",
            title: "EventHub Platform",
            description: "A platform for discovering and managing local events.",
            tech: ["React", "CSS Modules", "Mock API"],
            metrics: "Component Design | User Experience",
            caseStudy: [
                {
                    title: "1️⃣ Problem Statement",
                    content: "Local events are often scattered across social media or disparate websites. Users need a centralized hub to filter events by category, date, and location."
                },
                {
                    title: "2️⃣ Constraints & Challenges",
                    content: [
                        "Filtering Performance: Searching through lists must be instant.",
                        "Responsive Design: The grid layout must adapt seamlessly from mobile to desktop."
                    ]
                },
                {
                    title: "3️⃣ Architecture & Design Decisions",
                    content: [
                        "Component-Based Architecture: Broke the UI into reusable atoms (EventCard, SearchBar, FilterTag) for maintainability.",
                        "Mock API Layer: Simulated network requests with artificial delays to implement and test loading states and skeletons."
                    ]
                },
                {
                    title: "4️⃣ Trade-Offs Considered",
                    content: [
                        "Client-side vs Server-side Filtering: Since the dataset was moderate, implemented filtering purely on the client-side for instant feedback without network latency."
                    ]
                },
                {
                    title: "5️⃣ Implementation Highlights",
                    content: [
                        "Custom Hooks: Extracted search logic into a `useEventSearch` hook to keep components clean.",
                        "CSS Grid: Utilized modern Grid layout for a robust responsive gallery."
                    ]
                },
                {
                    title: "6️⃣ Impact & Results",
                    content: [
                        "Delivered a polished, responsive user interface.",
                        "Showcased strong React fundamentals including Hooks, Props, and State management."
                    ]
                }
            ],
            engineeringDecisions: [
                {
                    decision: "Client-Side Filtering",
                    rationale: "For datasets <1000 items, round-trips to the server for filtering are wasteful. Client-side filtering is instant."
                },
                {
                    decision: "CSS Modules",
                    rationale: "Avoided class name collisions globally by scoping styles to components, keeping the codebase modular."
                }
            ],
            futureImprovements: [
                "Implement Virtualization (react-window) to support lists of 10,000+ events.",
                "Add a Map View (Leaflet/Google Maps) to see events geographically.",
                "Persist user 'Favorites' to LocalStorage."
            ],
            debugStory: {
                title: "The Flickering Filter",
                problem: "Typing in the search bar caused the list to flash and re-render aggressively.",
                diagnosis: "The search input state update was triggering a re-render of the entire list component on every keystroke.",
                fix: "Debounced the search input, only updating the filter state after the user stopped typing for 300ms.",
                result: "Smooth, performance-optimized search experience."
            }
        },
        {
            id: "planto",
            title: "Planto: Green Living",
            description: "A modern e-commerce interface for plant enthusiasts.",
            tech: ["HTML5", "CSS3", "JavaScript", "UI Animation"],
            metrics: "UI/UX Design | Micro-interactions",
            caseStudy: [
                {
                    title: "1️⃣ Problem Statement",
                    content: "E-commerce sites often feel generic and cluttered. Luxury or niche brands require a distinct visual identity that connects emotionally with the user through design."
                },
                {
                    title: "2️⃣ Constraints & Challenges",
                    content: [
                        "Visual Hierarchy: distinct sections for Hero, Featured, and Details without overwhelming the user.",
                        "Aesthetics: Must feel 'organic' and 'calm' to match the plant theme."
                    ]
                },
                {
                    title: "3️⃣ Architecture & Design Decisions",
                    content: [
                        "Semantic HTML: Used proper structural tags (nav, section, article) for SEO and accessibility.",
                        "CSS Variables: Established a strict color system (Greens, Earth tones) for consistency."
                    ]
                },
                {
                    title: "4️⃣ Trade-Offs Considered",
                    content: [
                        "Images vs. CSS Shapes: Used CSS for decorative elements where possible to reduce page load weight compared to heavy image assets."
                    ]
                },
                {
                    title: "5️⃣ Implementation Highlights",
                    content: [
                        "Micro-interactions: Added subtle hover effects and smooth transitions to buttons and cards to make the interface feel 'alive'.",
                        "Typography: Carefully paired serif and sans-serif fonts to evoke a premium editorial feel."
                    ]
                },
                {
                    title: "6️⃣ Impact & Results",
                    content: [
                        "Created a visually stunning, portfolio-ready frontend design.",
                        "Learned the importance of whitespace, typography, and color theory in UI engineering."
                    ]
                }
            ],
            engineeringDecisions: [
                {
                    decision: "CSS Custom Properties (Variables)",
                    rationale: "Hardcoding colors makes theming impossible. Variables allow instant global theme changes."
                },
                {
                    decision: "CSS Grid vs Flexbox",
                    rationale: "Used Grid for the 2D product gallery layouts and Flexbox for 1D navigation/component alignment."
                }
            ],
            futureImprovements: [
                "Convert into a full Shopify/Headless CMS theme.",
                "Add 'View in AR' feature to see plants in your room.",
                "Optimize critical rendering path (Preload fonts/images)."
            ],
            debugStory: {
                title: "Mobile Overflow Issues",
                problem: "Horizontal scrollbar appeared on mobile devices, breaking the layout.",
                diagnosis: "A decorative background circle had `width: 100vw` but didn't account for the scrollbar width.",
                fix: "Applied `overflow-x: hidden` to the body and used `max-width: 100%` instead of viewport units.",
                result: "Clean mobile responsive layout."
            }
        }
    ],

    roleFit: [
        {
            role: "AI / ML Engineer",
            match: "Very Strong",
            reasoning: "Demonstrated ability to build end-to-end ML pipelines (TraceFinder), deploy NLP models to production (Plagiarism Detection), and optimize for latency (Hearing Aid), going beyond just model training."
        },
        {
            role: "Full Stack Engineer",
            match: "Strong",
            reasoning: "Proven Full-Stack capability (EduTrack MERN), managing complex state (Redux), secure Auth flows, and responsive frontend design, though my passion leans slightly towards data/systems."
        },
        {
            role: "Systems / Embedded Engineer",
            match: "Strong (Niche)",
            reasoning: "My work on the Android Hearing Aid app (NDK/C++) shows rare competence in low-level memory management and real-time constraints."
        }
    ],

    experience: [
        {
            role: "Cyber Security & Ethical Hacking Intern",
            company: "SuprMent Technologies (NASSCOM FutureSkills)",
            period: "Feb 2026 – May 2026",
            description: "Intensive 4-month program focused on security fundamentals, vulnerability assessment, and real-world cyber threat analysis.",
            skills: ["Ethical Hacking", "Vulnerability Assessment", "Cyber Security", "Threat Analysis"]
        },
        {
            role: "Machine Learning Intern (Springboard 6.0)",
            company: "Infosys",
            period: "Nov 2025 – Jan 2026",
            description: "Developed ML-based scanner source identification for digital forensics. Worked on image preprocessing, CNN model training, and deployment for document authentication.",
            skills: ["Machine Learning", "CNN", "Digital Forensics", "Image Processing"]
        },
        {
            role: "Full Stack Web Development Intern",
            company: "Techismust Innovation Lab",
            period: "March 2024 - April 2024",
            description: "Worked on web development projects utilizing front-end and back-end technologies in a fast-paced environment.",
            skills: ["React.js", "Node.js", "Full Stack"]
        },
        {
            role: "Artificial Intelligence Intern",
            company: "IBM SkillsBuild",
            period: "April 2024 - May 2024",
            description: "Gained practical experience through a structured 6-week program focused on AI tools and technologies.",
            skills: ["Python", "AI Basics", "Machine Learning"]
        },
        {
            role: "AI: Transformative Learning Intern",
            company: "TechSaksham (Microsoft & SAP)",
            period: "June 2024 - July 2024",
            description: "Explored real-world applications of AI and its transformative impact on industry and society.",
            skills: ["AI Strategy", "Product Thinking", "Microsoft Azure AI"]
        }
    ],

    certifications: [
        { title: "AI For Product Management", issuer: "PENDO" },
        { title: "Generative AI", issuer: "Microsoft" },
        { title: "AI/ML", issuer: "Infosys" },
        { title: "GenAI Powered Data Analytics", issuer: "TATA" },
        { title: "Project Management", issuer: "Coursera" },
        { title: "Prompt Engineering", issuer: "Infosys" },
        { title: "Java Programming", issuer: "NPTEL" },
        { title: "Data Analytics Job Simulation", issuer: "Deloitte Australia" },
        { title: "Java FullStack Development", issuer: "SalesForce (TNS India Foundation)" }
    ],

    achievements: [
        {
            title: "1st Place, HACK TRACE Event",
            description: "Secured top position in competitive hackathon for rapid prototyping and problem-solving.",
            impact: "Delivered innovative software solutions under tight time constraints."
        },
        {
            title: "1st Place, HACK-A-IDEA",
            description: "Won first prize for ideation and development focused on creative application design.",
            impact: "Showcased strong technical execution and presentation skills."
        },
        {
            title: "Published Research Paper (IEEE)",
            description: "Authored and presented 'AI-powered plagiarism detection' at IEEE ICKECS 2025.",
            impact: "Validated NLP/ML expertise through peer-reviewed processes."
        }
    ],

    contact: {
        email: "msrrahulmahato@gmail.com",
        phone: "+91 9113828502",
        linkedIn: "https://www.linkedin.com/in/rahul-mahato-0b1534254",
        github: "https://github.com/Rxhulmxhxto29",
        location: "Bengaluru, Karnataka"
    },

    aiKnowledge: {
        intro: "Hi! I'm Rahul's Digital Twin. Think of me as his 'AI Portfolio Agent'. You can ask me technical questions like an interviewer, or just explore his background.",
        persona: "I am a professional, technical, and research-oriented assistant. I represent Rahul Mahato, an engineer who values system thinking, low-latency performance, and AI-driven solutions.",
        suggestedQuestions: [
            "What makes Rahul a unique candidate?",
            "Can you explain his IEEE research paper?",
            "What is his most technically challenging project?",
            "Tell me about his 'Engineering Mindset'.",
            "What projects show his Full-Stack expertise?"
        ],
        responses: {
            "unique": "Rahul stands out because of his rare combination of low-level systems engineering, AI/ML research at Infosys, and hands-on Cybersecurity expertise. He builds secure, intelligent systems from the ground up.",
            "cyber": "Rahul completed an intensive Cybersecurity & Ethical Hacking internship with SuprMent Technologies (NASSCOM). He has hands-on experience in vulnerability assessment, threat analysis, and ethical hacking tools.",
            "forensics": "At Infosys Springboard, Rahul worked on a machine learning project for Digital Forensics. He built CNN models to identify scanner sources for document authentication, merging AI with security.",
            "ieee": "His research paper 'AI-Powered Plagiarism Detection System' was published at IEEE ICKECS 2025. It moves beyond simple keyword matching to detect deep semantic plagiarism using Transformers and NLP pipelines. It's currently in the IEEE proceedings.",
            "challenging": "The 'Feature-Rich Hearing Aid App' was his most complex work. Achieving ~3ms latency on Android required balancing native C++ (NDK) with high-level Java/Kotlin, managing multithreading, and optimizing Digital Signal Processing (DSP) algorithms.",
            "mindset": "Rahul follows a 'System Thinking' approach. Every line of code is written with scalability and OOP principles in mind. He believes in 'Product Thinking'—making sure the technology solves a real user problem, not just a technical one.",
            "full stack": "His 'Hospital Management Suite' demonstrates his ability to build complex CRM systems from scratch, while his 'NLP Chatbot' and 'Plagiarism Detection' tools show how he integrates robust backend AI with clean web/app frontends like React and Flutter.",
            "strengths": "Rahul's key strengths include rapid prototyping (winning 2 hackathons), deep technical research (IEEE published), and versatility across AI, Web, Mobile, and Cybersecurity.",
            "weakness": "As a lifelong learner, Rahul sometimes dives too deep into research. However, his hackathon wins prove he can also pivot and deliver high-impact MVPs under intense pressure.",
            "goals": "Rahul is focused on building intelligence-driven products. He wants to work at the intersection of AI, Security, and Scalable Systems.",
            "education": "He is currently a Computer Science and Design student at Atria Institute of Technology, maintaining a strong CGPA of 8.7. He has a strong foundation in DSA, DBMS, and AI.",
            "ibm": "At IBM SkillsBuild, he focused on applying AI tools to real-world datasets, which further solidified his practical ML skills beyond just theoretical knowledge.",
            "default": "I can tell you about Rahul's technical projects (Hearing Aid, AI Plagiarism, CRM), his research (IEEE 2025), or his cybersecurity and AI internships. What specific area are you interested in?"
        }
    }
};
