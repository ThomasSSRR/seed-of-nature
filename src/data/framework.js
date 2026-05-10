export const FRAMEWORK_NODES = [
  // ── PRESENT AXIS (bottom-up: 5→1) ──────────────────────────────────────────
  {
    id: "present_truth",
    axis: "present",
    value: "truth",
    depth: null,
    label: "Clarity",
    subtitle: "Present × Truth",
    color: "#C8A96E",
    accentColor: "#E8C98E",
    description: "What is actually true right now, without narrative overlay.",
    questions: [
      "What are the facts of your current situation — stripped of interpretation?",
      "What is your body telling you that your mind is rationalizing away?",
      "What is observation and what is narrative in how you see your life right now?",
      "What is fully within your control — and what is not?"
    ],
    inputs: ["Writing", "Awareness of mental activity", "Mapping of body (breath, body from within, senses)", "First principles reasoning"],
    exercisePrompt: "Before answering, take 3 slow breaths. Write what is simply true — no interpretation, no story. Facts only."
  },
  {
    id: "present_great_essence",
    axis: "present",
    value: "great",
    depth: "essence",
    label: "Discernment",
    subtitle: "Present × Great × Essence",
    color: "#8B7355",
    accentColor: "#A89070",
    description: "What is fundamental here — beneath the surface patterns.",
    questions: [
      "What is the root cause beneath what you are currently experiencing?",
      "What is truly fundamental in this situation — the thing that, if changed, would change everything?",
      "What are the second-order effects of your current patterns that you have not yet fully traced?"
    ],
    inputs: ["Modeling", "Research methods", "Scientific reasoning", "Data analysis"],
    exercisePrompt: "Ask 'why' five times on your most pressing challenge. Write what you arrive at."
  },
  {
    id: "present_great_order_culture",
    axis: "present",
    value: "great",
    depth: "order",
    sublabel: "Culture",
    label: "Patterns — Culture",
    subtitle: "Present × Great × Order",
    color: "#6B8C6B",
    accentColor: "#8BAF8B",
    description: "The invisible rules that govern the systems you inhabit.",
    questions: [
      "What story explains why the systems around you are the way they are?",
      "What assumptions define the behavior of the environments you operate in?",
      "What is considered 'success' in your current environment — and do you agree?",
      "What is taboo to question in the spaces you inhabit?",
      "What behaviors are informally rewarded that are never officially acknowledged?",
      "What belief must someone hold to survive — or thrive — in your current context?"
    ],
    inputs: ["Assumptions", "Narratives", "Norms"],
    exercisePrompt: "Think of the environment where you spend the most energy. Write as an anthropologist observing it for the first time."
  },
  {
    id: "present_great_order_processes",
    axis: "present",
    value: "great",
    depth: "order",
    sublabel: "Processes",
    label: "Patterns — Processes",
    subtitle: "Present × Great × Order",
    color: "#6B8C6B",
    accentColor: "#8BAF8B",
    description: "How energy, matter and information actually move.",
    questions: [
      "How does energy, information, and attention actually move through your life right now?",
      "Where are the bottlenecks or friction points that slow you down most?",
      "What triggers real change in your behavior — and what merely stabilizes the status quo?",
      "Where does rework happen repeatedly in your life — the same problems returning?",
      "Is your current system designed for scalability, stability, or survival?"
    ],
    inputs: ["Feedback loops", "Tools"],
    exercisePrompt: "Map your last week as a system. Where did energy leak? Where did it compound?"
  },
  {
    id: "present_great_order_structure",
    axis: "present",
    value: "great",
    depth: "order",
    sublabel: "Structure",
    label: "Patterns — Structure",
    subtitle: "Present × Great × Order",
    color: "#6B8C6B",
    accentColor: "#8BAF8B",
    description: "The architecture of constraints and incentives shaping your choices.",
    questions: [
      "What elements compose your current life system — roles, relationships, commitments?",
      "Where does power or influence concentrate in your world, and is that intentional?",
      "Where is accountability unclear or diffused in your life?",
      "Who benefits from your current setup — and is that aligned with your values?",
      "What incentives are actually determining your daily actions, beneath stated intentions?"
    ],
    inputs: ["Architecture", "Governance", "Incentives", "Policies"],
    exercisePrompt: "Draw your current life as an org chart. Who has authority? Who is responsible? Where do they diverge?"
  },
  {
    id: "present_great_order_patterns",
    axis: "present",
    value: "great",
    depth: "order",
    sublabel: "Recurring Dynamics",
    label: "Patterns — Dynamics",
    subtitle: "Present × Great × Order",
    color: "#6B8C6B",
    accentColor: "#8BAF8B",
    description: "The cycles that repeat regardless of your intentions.",
    questions: [
      "What outcomes keep recurring in your life despite your intentions to change them?",
      "What behaviors do you reproduce even when you consciously decide not to?",
      "What tensions in your life never fully resolve — they only temporarily subside?",
      "If nothing changes structurally, what will you be dealing with in 3 years that you are dealing with today?"
    ],
    inputs: ["Causality analysis", "Mappings"],
    exercisePrompt: "Identify one pattern that has appeared in at least 3 different contexts of your life. Describe it precisely."
  },
  {
    id: "present_great_union",
    axis: "present",
    value: "great",
    depth: "union",
    label: "Framing",
    subtitle: "Present × Great × Union",
    color: "#7A8C6B",
    accentColor: "#9AAF8B",
    description: "How it all integrates — coherence across parts.",
    questions: [
      "How does your current direction integrate into the whole of who you are becoming?",
      "Does your current path elevate coherence between your values, your actions, and your environment?",
      "Does what you are building express genuine intent — or is it reactive?"
    ],
    inputs: ["Developing personal qualities", "Strategist", "System thinking", "Strategic leader", "Human developer"],
    exercisePrompt: "Look at all your current commitments. Which ones strengthen each other? Which ones contradict?"
  },
  {
    id: "present_beautiful",
    axis: "present",
    value: "beautiful",
    depth: null,
    label: "Presence",
    subtitle: "Present × Beautiful",
    color: "#9B6B8C",
    accentColor: "#BF8BAF",
    description: "What is elegant here — and what calls to be redesigned.",
    questions: [
      "What is elegant in your current life — what already has the right form?",
      "What aspect of your current situation is calling to be fundamentally redesigned?",
      "Where are you in activation mode (planning, metacognition) when you need flow — and vice versa?"
    ],
    inputs: ["Shaping reality", "Switch button: activation ↔ flow"],
    exercisePrompt: "Identify one thing in your life right now that feels genuinely beautiful — well-formed, right. Then one thing that feels wrong in form, not just in content."
  },

  // ── METHODS AXIS (bottom-up: 10→6) ─────────────────────────────────────────
  {
    id: "methods_truth",
    axis: "methods",
    value: "truth",
    depth: null,
    label: "Understanding",
    subtitle: "Methods × Truth",
    color: "#C8A96E",
    accentColor: "#E8C98E",
    description: "How you learn, correct, and refine your models of reality.",
    questions: [
      "What is your current method for moving from inquiry to understanding — how do you actually learn?",
      "Where are you acquiring skills right now, and is that acquisition deliberate or accidental?",
      "What objective are you managing toward — and how do you know if you are moving closer?"
    ],
    inputs: ["Inquiry → Experiment → Correction → Model refinement", "Objectives management", "Skills acquisition"],
    exercisePrompt: "Describe your last genuine learning — something that changed how you see, not just what you know."
  },
  {
    id: "methods_great_essence",
    axis: "methods",
    value: "great",
    depth: "essence",
    label: "Growth through Tension",
    subtitle: "Methods × Great × Essence",
    color: "#8B7355",
    accentColor: "#A89070",
    description: "Using friction as the mechanism of development.",
    questions: [
      "What friction in your current life could you deliberately use to strengthen your capacity?",
      "Where are you avoiding difficulty that is actually the path to what you want?",
      "What unclear system in your life could you model more precisely — rather than navigate by intuition?"
    ],
    inputs: ["Use friction to strengthen capacity", "Model unclear systems"],
    exercisePrompt: "Name the thing you are most resisting right now. What would it mean to walk toward it instead of around it?"
  },
  {
    id: "methods_great_order",
    axis: "methods",
    value: "great",
    depth: "order",
    label: "Structures that Support Emergence",
    subtitle: "Methods × Great × Order",
    color: "#6B8C6B",
    accentColor: "#8BAF8B",
    description: "The systems you build so that capability compounds without heroics.",
    questions: [
      "What does your current weekly and daily structure actually look like — not what you intend, what is real?",
      "Where does your consciousness system need better mapping — what is unmapped that should be explicit?",
      "What strategic thinking structures do you use — and where are they absent?"
    ],
    inputs: ["System mapping of consciousness", "Strategic thinking", "Weekly plan", "Day structure"],
    exercisePrompt: "Design your ideal week structure in blocks. Then write your actual last week. Where is the gap largest?"
  },
  {
    id: "methods_great_union",
    axis: "methods",
    value: "great",
    depth: "union",
    label: "Stable Character",
    subtitle: "Methods × Great × Union",
    color: "#7A8C6B",
    accentColor: "#9AAF8B",
    description: "The character formed through iterative alignment across time.",
    questions: [
      "How stable is your character under pressure — does who you are shift significantly with context?",
      "How well do you regulate your nervous system when facing uncertainty or high stakes?",
      "How do you currently manage your energy — and where does mismanagement cost you most?"
    ],
    inputs: ["Stable character through repeated alignment", "Nervous system regulation", "Management of uncertainty", "Energy management"],
    exercisePrompt: "Recall the last time you were under significant pressure. Who were you in that moment — and who do you want to be?"
  },
  {
    id: "methods_beautiful",
    axis: "methods",
    value: "beautiful",
    depth: null,
    label: "Elevation",
    subtitle: "Methods × Beautiful",
    color: "#9B6B8C",
    accentColor: "#BF8BAF",
    description: "The creative emergence cycle — from curiosity to flow.",
    questions: [
      "Where in your life are you currently in genuine flow — pure absorption without framework?",
      "What would it mean to approach your most important work through the cycle: Curiosity → Play → Create → Refine → Flow?",
      "Where are you seeking feedback and using it — and where are you avoiding it?"
    ],
    inputs: ["Creative emergence cycle: Curiosity → Play → Create → Refine → Flow", "Improvement", "Feedback"],
    exercisePrompt: "Identify the last time you were fully in flow. What were the conditions? What triggered it? What ended it?"
  },

  // ── WILL AXIS (bottom-up: 15→11) ────────────────────────────────────────────
  {
    id: "will_truth",
    axis: "will",
    value: "truth",
    depth: null,
    label: "Insight",
    subtitle: "Will × Truth",
    color: "#C8A96E",
    accentColor: "#E8C98E",
    description: "The clarity that precedes action — transforming observation into conviction.",
    questions: [
      "What truth does your current situation reveal that you have not yet acted on?",
      "What uncomfortable conviction do you hold that you have not yet articulated publicly?",
      "What are you observing that others around you are rationalizing away?",
      "What truth, if you fully accepted it, would most clarify your next decision?"
    ],
    tension: "Between radical honesty and premature bias to action.",
    inputs: ["Problem framing before solving", "Speaking clearly in ambiguous situations", "Model revising"],
    exercisePrompt: "Write the one thing you know to be true about your situation that you have not said out loud to anyone."
  },
  {
    id: "will_great_essence",
    axis: "will",
    value: "great",
    depth: "essence",
    label: "Execution",
    subtitle: "Will × Great × Essence",
    color: "#8B7355",
    accentColor: "#A89070",
    description: "The anchor that makes action coherent. Do the thing.",
    questions: [
      "What is the single action that would make everything else real right now?",
      "What are you avoiding under the name of preparation or refinement?",
      "What would 'done' look like concretely today — not in theory, in the physical world?",
      "What is the minimum viable commitment that creates irreversibility?"
    ],
    tension: "Between the perfectionism that delays and the discipline that ships.",
    inputs: ["Position taken", "Work submitted", "Decision made and held under pressure", "Presence in the room"],
    exercisePrompt: "Name the thing you have been 'almost ready' to do for more than 2 weeks. What would it take to do it today?"
  },
  {
    id: "will_great_order",
    axis: "will",
    value: "great",
    depth: "order",
    label: "Leadership",
    subtitle: "Will × Great × Order",
    color: "#6B8C6B",
    accentColor: "#8BAF8B",
    description: "The structure that makes intention durable — without daily heroics.",
    questions: [
      "What system could you design so that results occur without depending on your daily effort?",
      "What structure, if built, would compound knowledge and leverage over time?",
      "Where must you position yourself so that others orient around your direction?",
      "What feedback loop would make your current system self-improving?"
    ],
    tension: "Between the clarity of personal vision and the patience required to build systems others can own.",
    inputs: ["Build reusable intellectual property", "Embedded feedback loops", "Position occupied that attracts"],
    exercisePrompt: "Describe the system you would build if you knew you would be unavailable for 6 months starting tomorrow."
  },
  {
    id: "will_great_union",
    axis: "will",
    value: "great",
    depth: "union",
    label: "Influence",
    subtitle: "Will × Great × Union",
    color: "#7A8C6B",
    accentColor: "#9AAF8B",
    description: "The engagement that makes action visible and irreversible.",
    questions: [
      "Who needs to see what you are building to make it undeniable?",
      "How does your current direction integrate into a larger movement or structural shift?",
      "What visible act would change the field — not just the conversation you are already in?"
    ],
    tension: "Between authentic conviction and the discipline of translating it into a language others can receive.",
    inputs: ["Idea that spreads beyond its origin", "Public position in ambiguity", "Coalition built around direction"],
    exercisePrompt: "Describe your work as if explaining it to someone who has never met you and has 60 seconds to decide if it matters."
  },
  {
    id: "will_beautiful",
    axis: "will",
    value: "beautiful",
    depth: null,
    label: "Creation",
    subtitle: "Will × Beautiful",
    color: "#9B6B8C",
    accentColor: "#BF8BAF",
    description: "The act that expresses identity. Not what must be done — what is chosen to create.",
    questions: [
      "Does your current work express something genuinely true about who you are?",
      "What form would give your most important idea both precision and beauty?",
      "What would you create with zero constraint of external legitimacy?",
      "What work, if you produced it, would make you feel most fully yourself?"
    ],
    tension: "Between authentic expression and effective communication to others.",
    inputs: ["Design that combines conviction, strategy, commitment", "Build systems that increase human capability"],
    exercisePrompt: "Describe the work you would do if no one would ever know you did it — but the result would exist in the world."
  }
];

export const AXIS_META = {
  present: {
    label: "Present",
    subtitle: "Pattern Recognition",
    description: "What is true right now, beneath narrative.",
    color: "#C8A96E"
  },
  methods: {
    label: "Methods",
    subtitle: "Iterative Synthesis",
    description: "How you learn, build, and compound capability.",
    color: "#6B8C6B"
  },
  will: {
    label: "Will",
    subtitle: "Directed Action",
    description: "What you choose to build and make irreversible.",
    color: "#9B6B8C"
  }
};

export const ALTER_EGOS = {
  union: { name: "Barack Obama", principle: "How does it integrate into the whole?" },
  order: { name: "Michael Porter", principle: "What structures organize it?" },
  essence: { name: "Marcus Aurelius", principle: "What is fundamental here?" }
};
