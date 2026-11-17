import {
  Workout,
  Recipe,
  BreathingExercise,
  GuidedMeditation,
  HappyThought,
  HabitItem,
  WellbeingMilestone,
} from '@/types/reset';

export const DEFAULT_HABITS: HabitItem[] = [
  {
    id: 'habit_1',
    title: 'Morning glass of warm water',
    category: 'nourish',
    week: 1,
    gentleTip: 'A gentle wake-up kiss for your digestive system before anything else.',
  },
  {
    id: 'habit_2',
    title: '5 minutes of slow, intuitive stretching',
    category: 'movement',
    week: 1,
    gentleTip: 'Move only in ways that feel like a soft yawn for your muscles.',
  },
  {
    id: 'habit_3',
    title: 'Step outside or open a window for fresh air',
    category: 'mind',
    week: 1,
    gentleTip: 'Feel the sky and daylight on your face for just a few slow breaths.',
  },
  {
    id: 'habit_4',
    title: 'Midday shoulder roll & chest breath',
    category: 'rest',
    week: 2,
    gentleTip: 'Let your shoulders drop down away from your ears.',
  },
  {
    id: 'habit_5',
    title: '10-minute mindful wander or light walk',
    category: 'movement',
    week: 2,
    gentleTip: 'No pace requirements. Simply let your feet meet the ground.',
  },
  {
    id: 'habit_6',
    title: 'Nourishing colorful snack or herbal infusion',
    category: 'nourish',
    week: 3,
    gentleTip: 'Choose something that feels warm, hydrating, and kind to your tummy.',
  },
  {
    id: 'habit_7',
    title: 'Gentle strength or joint ease movement',
    category: 'movement',
    week: 3,
    gentleTip: 'Building gentle stability with patience and zero force.',
  },
  {
    id: 'habit_8',
    title: 'Screen-free bedtime wind-down',
    category: 'selfcare',
    week: 4,
    gentleTip: 'Give your mind a cozy transition from doing into resting.',
  },
];

export const HAPPY_THOUGHTS: HappyThought[] = [
  {
    id: 'thought_1',
    text: 'I hope something unexpectedly lovely happens to you today.',
    theme: 'kindness',
  },
  {
    id: 'thought_2',
    text: "You deserve flowers, even when there's no occasion.",
    theme: 'friendship',
  },
  {
    id: 'thought_3',
    text: "Life is still full of beautiful things you haven't discovered yet.",
    theme: 'gentle_reminder',
  },
  {
    id: 'thought_4',
    text: 'I hope you get to eat something delicious and comforting today.',
    theme: 'kindness',
  },
  {
    id: 'thought_5',
    text: 'Remember to look at the moon tonight, even for five seconds.',
    theme: 'nature',
  },
  {
    id: 'thought_6',
    text: 'Your worth was never tied to how much you crossed off your to-do list.',
    theme: 'gentle_reminder',
  },
  {
    id: 'thought_7',
    text: 'You have survived 100% of your heaviest days. Be gentle with your tender heart.',
    theme: 'friendship',
  },
  {
    id: 'thought_8',
    text: 'Give your jaw permission to unclamp and your tongue to rest off the roof of your mouth.',
    theme: 'presence',
  },
  {
    id: 'thought_9',
    text: 'Small steps do add up. One sip of water, one breath, one kind thought at a time.',
    theme: 'presence',
  },
  {
    id: 'thought_10',
    text: 'The trees don’t rush their leaves, and yet everything blooms right on time.',
    theme: 'nature',
  },
];

export const WORKOUTS: Workout[] = [
  {
    id: 'workout_spine_flow',
    name: 'Morning Spine & Gentle Awakening',
    category: 'gentle',
    level: 'starting_again',
    durationMinutes: 8,
    difficulty: 'Very Gentle',
    equipmentRequired: ['Yoga Mat or Soft Rug'],
    illustration: 'leaf-spine',
    description: 'A slow, soothing flow to wake up stiff vertebrae and open the chest without any strain.',
    instructions: [
      'Find a comfortable seated or kneeling position.',
      'Sync each movement with an easy, unhurried breath.',
      'Never push into a sharp edge; soft curves are the goal.'
    ],
    modifications: [
      'Can be performed seated on a sturdy chair if floor transitions cause knee discomfort.',
      'Place a pillow under knees or hips for extra cushioning.'
    ],
    jointsProtected: ['Knees', 'Lower Back'],
    isArthritisFriendly: true,
    clinicianReviewedNote: 'Excellent for morning stiffness. Focus on fluid range of motion without end-range forcing.',
    steps: [
      { name: 'Seated Gentle Rib Breaths', seconds: 60, cue: 'Inhale to expand ribs wide, exhale softly through parted lips.' },
      { name: 'Seated Cat & Cow Wave', seconds: 90, cue: 'Softly round the spine on exhale, open collarbones on inhale.' },
      { name: 'Gentle Torso Spirals', seconds: 90, cue: 'Slow circles like stirring a warm pot of soup.' },
      { name: 'Side Body Crescent Reach', seconds: 90, cue: 'Reach one arm overhead gently, breathing into the flank.' },
      { name: 'Child’s Pose or Supported Forward Fold', seconds: 120, cue: 'Rest forehead on a cushion, letting back tension release completely.' },
    ],
  },
  {
    id: 'workout_desk_relief',
    name: 'Desk & Screen Tension Relief',
    category: 'mobility',
    level: 'starting_again',
    durationMinutes: 6,
    difficulty: 'Very Gentle',
    equipmentRequired: ['Any Chair'],
    illustration: 'chair-stretch',
    description: 'Unravel neck tightness, hunched shoulders, and stiff wrists right at your desk.',
    instructions: [
      'Sit tall with feet flat on the floor.',
      'Allow shoulders to drop down and away from ears.',
      'Breathe naturally throughout each movement.'
    ],
    modifications: [
      'Adjust arm angles if you feel pinch in the shoulder socket.',
      'Keep wrist circles light and fluid.'
    ],
    jointsProtected: ['Neck', 'Shoulders', 'Wrists'],
    isArthritisFriendly: true,
    clinicianReviewedNote: 'Helps prevent micro-trauma from sustained keyboard and screen posture. Relieves carpal tunnel strain.',
    steps: [
      { name: 'Shoulder Rolls & Melts', seconds: 60, cue: 'Roll shoulders up towards ears, then glide them softly down the back.' },
      { name: 'Gentle Neck Ear-to-Shoulder', seconds: 90, cue: 'Drop right ear toward right shoulder without forcing. Repeat on left.' },
      { name: 'Seated Chest Opener & W-Arms', seconds: 75, cue: 'Draw elbows slightly back in a soft W-shape, feeling collarbones widen.' },
      { name: 'Wrist Wave & Finger Openers', seconds: 75, cue: 'Open fingers wide like flower petals, then softly relax into an easy fist.' },
      { name: 'Seated Spinal Twist', seconds: 60, cue: 'Gently turn torso to the right holding chair arm, then turn left.' },
    ],
  },
  {
    id: 'workout_arthritis_knee',
    name: 'Clinician-Reviewed Knee Joint Ease & Support',
    category: 'arthritis',
    level: 'starting_again',
    durationMinutes: 10,
    difficulty: 'Gentle',
    equipmentRequired: ['Sturdy Chair', 'Rolled Towel or Small Pillow'],
    illustration: 'knee-care',
    description: 'Zero-impact isometric exercises designed by physical therapy guidelines to strengthen the quadriceps and stabilize knee joints without joint compression.',
    instructions: [
      'Sit supported on a chair with good posture.',
      'Engage thigh muscles smoothly without jerking.',
      'Stop immediately if you feel sharp or stabbing pain.'
    ],
    modifications: [
      'If straightening knee fully causes clicking or pinching, stop at 80% extension.',
      'Keep feet grounded and avoid heavy weights.'
    ],
    jointsProtected: ['Knees', 'Hips'],
    isArthritisFriendly: true,
    clinicianReviewedNote: 'Clinician Reviewed: Isometric quad contractions strengthen the vastus medialis to absorb shock away from the cartilage. Suitable during mild osteoarthritic aches; do not perform during acute hot joint effusion.',
    steps: [
      { name: 'Seated Knee Extensor Hover (Right)', seconds: 75, cue: 'Gently straighten right leg out, hold for 3 seconds, lower with control.' },
      { name: 'Seated Knee Extensor Hover (Left)', seconds: 75, cue: 'Straighten left leg smoothly, keeping toes pointed softly up.' },
      { name: 'Towel Squeeze Isometric', seconds: 90, cue: 'Place a rolled towel between knees, squeeze gently for 5s, release for 3s.' },
      { name: 'Supported Heel Slides', seconds: 90, cue: 'Slide heel back and forth on a smooth floor or towel with zero weight.' },
      { name: 'Seated Ankle Pumps & Circles', seconds: 90, cue: 'Pump toes up and down to boost venous circulation and lymphatic drainage.' },
      { name: 'Restorative Seated Quad Release', seconds: 60, cue: 'Smoothly stroke thigh muscles with palms to ease residual tension.' },
    ],
  },
  {
    id: 'workout_arthritis_hands',
    name: 'Clinician-Reviewed Warm Hand & Wrist Mobility',
    category: 'arthritis',
    level: 'starting_again',
    durationMinutes: 7,
    difficulty: 'Very Gentle',
    equipmentRequired: ['Flat Table', 'Warm Damp Towel (Optional)'],
    illustration: 'hand-care',
    description: 'Gentle range-of-motion sequence for osteoarthritis or rheumatoid stiffness in the knuckles, thumbs, and wrists.',
    instructions: [
      'Rest forearms comfortably on a table.',
      'Begin by warming hands with gentle friction or a warm cloth.',
      'Never force fingers into tight curls; glide within comfort.'
    ],
    modifications: [
      'Use an open claw rather than tight fist if finger joints feel tender.',
      'Perform after a warm shower or bath for maximal comfort.'
    ],
    jointsProtected: ['Hands', 'Wrists', 'Fingers'],
    isArthritisFriendly: true,
    clinicianReviewedNote: 'Clinician Reviewed: Tendon gliding exercises decrease synovial swelling and preserve thumb opposition essential for daily activities.',
    steps: [
      { name: 'Warm Palm Warming Friction', seconds: 60, cue: 'Gently rub palms together to generate warm soothing circulation.' },
      { name: 'Table Finger Sprawls', seconds: 75, cue: 'Place palms flat on table, softly glide fingers outward and inward.' },
      { name: 'Soft Fist to Open Fan', seconds: 90, cue: 'Curl fingers into a loose, soft claw, then open into a peaceful star.' },
      { name: 'Thumb Opposition Touches', seconds: 90, cue: 'Gently touch thumb tip to index, middle, ring, and little finger in sequence.' },
      { name: 'Wrist Wave & Prayer Ease', seconds: 90, cue: 'Bring palms together softly in front of heart; lower wrists slightly to feel stretch.' },
    ],
  },
  {
    id: 'workout_gentle_strength',
    name: 'Kind Strength: Wall & Chair Foundations',
    category: 'strength',
    level: 'building_strength',
    durationMinutes: 14,
    difficulty: 'Gentle',
    equipmentRequired: ['Sturdy Wall', 'Supportive Chair'],
    illustration: 'strength-kind',
    description: 'Build functional tone, bone density, and stability using gravity and your own bodyweight with complete safety.',
    instructions: [
      'Move slowly with control. Quality over speed.',
      'Exhale on the effort, inhale on the release.',
      'Keep feet grounded and core gently engaged like a soft hug.'
    ],
    modifications: [
      'Step closer to the wall to decrease effort on wall push-ups.',
      'Use chair arms for support during sit-to-stands if needed.'
    ],
    jointsProtected: ['Wrists', 'Knees', 'Shoulders'],
    isArthritisFriendly: true,
    clinicianReviewedNote: 'Closed-chain exercises like wall presses build shoulder girdle stability without taxing the rotator cuff.',
    steps: [
      { name: 'Wall Push-Ups with Soft Elbows', seconds: 90, cue: 'Stand arm-length from wall, bend elbows softly to 45 degrees, press back.' },
      { name: 'Chair Sit-to-Stand (Tempo)', seconds: 120, cue: 'Press through heels, rise to standing smoothly, then hinge back to sit lightly.' },
      { name: 'Standing Supported Calf Raises', seconds: 90, cue: 'Hands on chair back, lift heels 2 inches, lower slowly for ankle strength.' },
      { name: 'Supported Hip Glides to Side', seconds: 90, cue: 'Lift right leg slightly to side for hip stabilizer activation, then left.' },
      { name: 'Wall Angel Arm Slides', seconds: 90, cue: 'Back flat against wall, slide arms in a gentle snow-angel arc.' },
      { name: 'Restorative Standing Breaths', seconds: 60, cue: 'Hands over heart and belly, feeling strength settle into your bones.' },
    ],
  },
  {
    id: 'workout_low_impact_cardio',
    name: 'Happy Rhythm: Living Room Gentle Stepping',
    category: 'cardio',
    level: 'finding_rhythm',
    durationMinutes: 15,
    difficulty: 'Accessible Moderate',
    equipmentRequired: ['Comfortable Footwear or Barefoot on Mat'],
    illustration: 'rhythm-step',
    description: 'Lift your mood, oxygenate your blood, and smile with zero jumping and zero knee impact.',
    instructions: [
      'Keep steps light and springy like stepping on moss.',
      'Swing arms in an easy natural rhythm.',
      'You should always be able to hold a conversation while moving.'
    ],
    modifications: [
      'Can be done entirely seated in a chair by marching feet and swinging arms.',
      'Slow the tempo whenever needed.'
    ],
    jointsProtected: ['Knees', 'Ankles', 'Hips'],
    isArthritisFriendly: true,
    clinicianReviewedNote: 'Low-impact rhythmic movement releases endorphins, reduces systemic inflammation, and lubricates joint synovial fluid.',
    steps: [
      { name: 'Easy Living Room March & Breath', seconds: 120, cue: 'Step softly in place, rolling shoulders and breathing deeply.' },
      { name: 'Side Step Tap with Heart Reach', seconds: 120, cue: 'Step right and tap left toe, step left and tap right toe with rhythmic arms.' },
      { name: 'Gentle Heel Digs & Bicep Curls', seconds: 120, cue: 'Dig heel forward while gently curling arms like holding sunshine.' },
      { name: 'Wide Step Sway & Gentle Rib Reach', seconds: 120, cue: 'Soft knee sway side to side, feeling buoyant and playful.' },
      { name: 'Cool Down Slow Walking & Shoulder Rolls', seconds: 120, cue: 'Gradually slow footsteps, taking deep satisfying breaths.' },
    ],
  },
  {
    id: 'workout_legs_up_wall',
    name: 'Restorative Reset: Legs-Up-The-Wall Unwind',
    category: 'rest',
    level: 'starting_again',
    durationMinutes: 10,
    difficulty: 'Very Gentle',
    equipmentRequired: ['Wall', 'Comfortable Pillow or Blanket'],
    illustration: 'legs-wall',
    description: 'The ultimate nervous system soother. Promotes lymphatic drainage, soothes heavy legs, and calms racing thoughts.',
    instructions: [
      'Bring hips close to a wall and swing legs upwards.',
      'Place a pillow under pelvis if that feels comforting.',
      'Rest arms out to the sides with palms facing up.'
    ],
    modifications: [
      'If hamstrings are tight, scoot hips 4-6 inches away from the wall.',
      'Can also be done with lower legs resting on a sofa seat.'
    ],
    jointsProtected: ['All Joints', 'Lower Back'],
    isArthritisFriendly: true,
    clinicianReviewedNote: 'Inverting legs gently decompresses the venous system, relieves pelvic pressure, and triggers parasympathetic vagal tone.',
    steps: [
      { name: 'Settling Into the Wall', seconds: 120, cue: 'Let hips feel heavy into the ground, arms resting like open wings.' },
      { name: 'Belly Wave Breathing', seconds: 180, cue: 'Notice belly rising like a gentle tide on inhale, softening down on exhale.' },
      { name: 'Gentle Ankle Wiggles & Toes Point', seconds: 90, cue: 'Small easy wiggles to encourage venous return from feet.' },
      { name: 'Stillness & Nervous System Softening', seconds: 180, cue: 'Nowhere to go, nothing to fix. Let your body completely rest.' },
    ],
  },
];

export const RECIPES: Recipe[] = [
  {
    id: 'recipe_golden_porridge',
    title: 'Golden Turmeric & Cardamom Oatmeal',
    category: 'Breakfast',
    prepTime: '10 mins',
    tags: ['Anti-inflammatory', 'Warm & Soothing', 'Digestive Ease'],
    ingredients: [
      '1/2 cup rolled oats',
      '1 cup warm oat milk or almond milk',
      '1/2 tsp ground turmeric',
      '1/4 tsp ground cinnamon & pinch of cardamom',
      'Pinch of black pepper (enhances turmeric absorption)',
      '1 tsp raw honey or pure maple syrup',
      '1 tbsp ground flaxseeds or chia seeds',
      'Handful of blueberries or sliced banana'
    ],
    instructions: [
      'Combine oats, milk, turmeric, cinnamon, black pepper, and cardamom in a small pot over medium heat.',
      'Simmer gently for 5–7 minutes, stirring with love until thick and creamy.',
      'Pour into your favorite warm bowl, swirl in honey, and top with seeds and berries.',
      'Breathe in the golden spices before your first spoonful.'
    ],
    whyBodyLovesThis: 'Turmeric contains curcumin, a potent natural compound that eases joint inflammation and morning stiffness. Black pepper enhances its absorption by up to 2000%. Oats provide soothing soluble fiber for stable morning energy.',
    isArthritisFriendly: true,
    isCycleSupportive: true,
  },
  {
    id: 'recipe_avocado_white_bean',
    title: 'Lemon Herb Avocado & White Bean Bowl',
    category: 'Lunch',
    prepTime: '12 mins',
    tags: ['High Fiber', 'Plant Protein', 'No-Cook'],
    ingredients: [
      '1 can cannellini or butter beans, rinsed and drained',
      '1 ripe avocado, diced',
      '1 cup baby spinach or arugula',
      '1/2 cup English cucumber, sliced',
      'Handful of cherry tomatoes, halved',
      'Juice of 1/2 fresh lemon',
      '1 tbsp extra virgin olive oil',
      'Pinch of sea salt, cracked pepper, and fresh dill'
    ],
    instructions: [
      'In a wide shallow bowl, arrange baby spinach as a fresh bed.',
      'Toss white beans and cucumber with olive oil, lemon juice, salt, and herbs.',
      'Spoon over greens and top with luscious diced avocado and cherry tomatoes.',
      'Enjoy unhurriedly with warm toasted sourdough if desired.'
    ],
    whyBodyLovesThis: 'White beans offer gentle, steady plant protein and magnesium to relax muscle tension. Avocado and extra virgin olive oil deliver oleic acid and polyphenols that nurture cellular membranes and lubricate joint tissues.',
    isArthritisFriendly: true,
    isCycleSupportive: true,
  },
  {
    id: 'recipe_lentil_sweet_potato',
    title: 'Cozy Red Lentil & Sweet Potato Stew',
    category: 'Dinner',
    prepTime: '25 mins',
    tags: ['Comfort Food', 'Iron-Rich', 'Cycle-Supportive'],
    ingredients: [
      '3/4 cup split red lentils (rinsed)',
      '1 medium sweet potato, peeled and cubed small',
      '1 cup coconut milk (light or classic)',
      '2 cups vegetable broth',
      '1 tsp grated fresh ginger',
      '1 clove garlic, minced',
      '1 tsp cumin and 1/2 tsp ground coriander',
      '2 generous handfuls of baby kale or spinach'
    ],
    instructions: [
      'In a pot, warm 1 tsp olive oil over low heat; stir in minced ginger, garlic, cumin, and coriander for 1 minute until fragrant.',
      'Add cubed sweet potato, rinsed red lentils, broth, and coconut milk.',
      'Bring to an easy simmer, cover, and cook for 18–20 minutes until sweet potatoes and lentils are fork-tender and velvety.',
      'Stir in greens until softly wilted. Taste and season with sea salt.',
      'Ladle into a deep bowl and let the warmth ground you.'
    ],
    whyBodyLovesThis: 'Red lentils are exceptionally easy to digest and packed with iron and folate, replenishing your vitality during menstruation. Sweet potatoes provide complex beta-carotene carbs that satisfy cravings naturally.',
    isArthritisFriendly: true,
    isCycleSupportive: true,
  },
  {
    id: 'recipe_pumpkin_seed_cup',
    title: 'Cacao & Spiced Pumpkin Seed Crunch Cup',
    category: 'Snack',
    prepTime: '5 mins',
    tags: ['Magnesium Rich', 'Hormone Balance', 'Quick'],
    ingredients: [
      '3/4 cup plain Greek yogurt or coconut yogurt',
      '2 tbsp roasted pumpkin seeds (pepitas)',
      '1 tsp raw cacao nibs or shaved dark chocolate (70%+)',
      'Drizzle of warm honey or raspberry compote'
    ],
    instructions: [
      'Spoon chilled yogurt into a small glass or ramekin.',
      'Sprinkle roasted pumpkin seeds and cacao nibs on top.',
      'Finish with a tiny drizzle of sweetness and savor slowly with a small spoon.'
    ],
    whyBodyLovesThis: 'Pumpkin seeds are one of nature’s richest sources of zinc and magnesium, essential for reducing menstrual cramp intensity, boosting mood neurotransmitters, and supporting restorative sleep.',
    isArthritisFriendly: true,
    isCycleSupportive: true,
  },
  {
    id: 'recipe_chamomile_lavender_tea',
    title: 'Calming Chamomile & Lavender Night Infusion',
    category: 'Warm Drink',
    prepTime: '6 mins',
    tags: ['Bedtime Wind-down', 'Caffeine-Free', 'Sleep Ritual'],
    ingredients: [
      '1 tbsp dried chamomile flowers (or 1 tea bag)',
      '1/2 tsp culinary dried lavender buds',
      'A twist of orange peel or lemon slice',
      '1 cup just-boiled pure water',
      '1/2 tsp raw honey (optional)'
    ],
    instructions: [
      'Place chamomile and lavender into a tea infuser inside your favorite cozy mug.',
      'Pour hot water over the herbs and cover with a small saucer to keep the essential oils from escaping.',
      'Steep for 5–7 minutes.',
      'Remove infuser, inhale the gentle floral steam, and sip slowly as evening turns to night.'
    ],
    whyBodyLovesThis: 'Apigenin in chamomile binds to GABA receptors in the brain, gently ushering your body into rest mode. Lavender has been clinically shown to decrease anxiety and heart rate before sleep.',
    isArthritisFriendly: true,
    isCycleSupportive: true,
  },
];

export const BREATHING_EXERCISES: BreathingExercise[] = [
  {
    id: 'breath_relaxation',
    name: 'Relaxation & Heart Coherence',
    tagline: 'Gentle nervous system reset without breath holds.',
    durationMinutes: 3,
    inhaleSec: 4,
    holdSec: 0,
    exhaleSec: 6,
    restSec: 0,
    focus: 'Anxiety relief, slowing down a racing pulse, evening calmness.',
    description: 'Extending your exhale triggers the vagus nerve to slow your heartbeat and invite deep physical ease.',
  },
  {
    id: 'breath_morning',
    name: 'Morning Awaken & Gentle Clarity',
    tagline: 'Breathe vitality into sleepy cells.',
    durationMinutes: 3,
    inhaleSec: 4,
    holdSec: 2,
    exhaleSec: 4,
    restSec: 1,
    focus: 'Morning focus, gentle energy without caffeine jitters.',
    description: 'Balanced rhythmic breathing brings fresh oxygen to the prefrontal cortex for a calm, collected start to your day.',
  },
  {
    id: 'breath_bedtime',
    name: 'Soft Bedtime 4-7-8 Drift',
    tagline: 'Soft, spacious release into sleep.',
    durationMinutes: 4,
    inhaleSec: 4,
    holdSec: 4,
    exhaleSec: 6,
    restSec: 2,
    focus: 'Insomnia relief, releasing lingering mental chatter.',
    description: 'A softened version of the classic 4-7-8 flow designed to be comfortable and spacious, never breathless.',
  },
  {
    id: 'breath_box',
    name: 'Four-Corner Box Breathing',
    tagline: 'Steady grounded presence like still water.',
    durationMinutes: 3,
    inhaleSec: 4,
    holdSec: 4,
    exhaleSec: 4,
    restSec: 4,
    focus: 'Centering before difficult conversations or busy moments.',
    description: 'Equal sides of inhale, pause, exhale, and pause create a feeling of solid, unshakeable stability.',
  },
  {
    id: 'breath_sigh',
    name: 'The Physiological Sigh',
    tagline: 'The fastest natural way to melt acute stress.',
    durationMinutes: 2,
    inhaleSec: 4,
    holdSec: 1,
    exhaleSec: 6,
    restSec: 1,
    focus: 'Sudden overwhelm, tight chest, instant release.',
    description: 'A deep breath in through your nose, a tiny extra top-up sip of air, and a long, audible sigh out through your mouth.',
  },
];

export const GUIDED_MEDITATIONS: GuidedMeditation[] = [
  {
    id: 'med_body_scan',
    title: 'Softening Body Scan',
    durationMinutes: 5,
    category: 'Somatic Ease',
    description: 'A gentle journey from the crown of your head to the tips of your toes, welcoming every sensation with kindness.',
    guidanceQuotes: [
      'Begin by noticing where your body touches the chair or bed beneath you.',
      'Allow your forehead to smooth out, like calm lake water.',
      'Release the space between your eyebrows. Let your temples soften.',
      'Notice your hands resting. They have done so much today. They are allowed to rest now.',
      'Feel your breath moving in your belly like gentle ocean waves.'
    ],
  },
  {
    id: 'med_tension_release',
    title: 'Letting Go of the Day’s Tension',
    durationMinutes: 7,
    category: 'Evening Release',
    description: 'Unburden your mind and body from today’s demands, expectations, and unspoken pressure.',
    guidanceQuotes: [
      'Whatever happened today is now in the past. You do not need to solve it tonight.',
      'Imagine packing any lingering worry into a soft paper boat and letting the river carry it away.',
      'You did enough today. Even on the quiet days, you are more than enough.',
      'Wrap yourself in this moment of quiet safety.'
    ],
  },
  {
    id: 'med_self_compassion',
    title: 'Self-Compassion for Tired Bodies',
    durationMinutes: 6,
    category: 'Gentle Healing',
    description: 'A tender meditation for when you feel fatigued, emotionally tender, or hard on yourself.',
    guidanceQuotes: [
      'Place one warm palm gently over your heart or on your cheek.',
      'Whisper to yourself: May I be patient with my tiredness.',
      'May I give myself the same tenderness I would offer a dear friend.',
      'There is no timeline you have to beat. Breathe and be here.'
    ],
  },
  {
    id: 'med_joint_soothing',
    title: 'Clinician-Reviewed Joint & Body Soothing',
    durationMinutes: 5,
    category: 'Arthritis & Ease',
    description: 'Soothing visualization to quiet neurogenic pain signals and invite cooling comfort into stiff joints.',
    guidanceQuotes: [
      'Clinician Note: Guided imagery activates brain endorphin pathways to soften pain perception.',
      'Picture a cool, silky healing balm gently resting over any areas of stiffness or ache.',
      'With every exhale, imagine warm space opening up between your joint capsules.',
      'You are safe inside your body right now. Let your muscles soften their guarding grip.'
    ],
  },
  {
    id: 'med_cycle_grounding',
    title: 'Cycle Grounding & Intuitive Rest',
    durationMinutes: 5,
    category: 'Menstrual Harmony',
    description: 'Connecting with your body’s natural ebb and flow, honoring rest as an active act of strength.',
    guidanceQuotes: [
      'Honor where you are in your cycle today without expectation.',
      'If you are bleeding or tender, give yourself permission to step down from the world.',
      'Your rhythm is ancient and wise. Trust the seasons within you.'
    ],
  },
];

export const WELLBEING_MILESTONES: WellbeingMilestone[] = [
  {
    id: 'mile_first_step',
    title: 'Gentle Beginning',
    description: 'Completed your first mindful movement session.',
    category: 'movement',
    icon: 'Feather',
    achieved: true,
    achievedDate: 'Recently',
  },
  {
    id: 'mile_breath_calm',
    title: 'River of Calm',
    description: 'Completed 3 calming breathwork sessions.',
    category: 'breathe',
    icon: 'Wind',
    achieved: true,
    achievedDate: 'Recently',
  },
  {
    id: 'mile_body_listener',
    title: 'Listening to Your Body',
    description: 'Chose a gentle rest day or adapted movement when tired.',
    category: 'rest',
    icon: 'HeartHandshake',
    achieved: true,
    achievedDate: 'Recently',
  },
  {
    id: 'mile_habit_tender',
    title: 'Habit Tender',
    description: 'Nurtured daily habits with kindness and zero pressure.',
    category: 'habits',
    icon: 'Sprout',
    achieved: false,
  },
  {
    id: 'mile_self_kindness',
    title: 'Self-Appreciation Spark',
    description: 'Wrote 3 reflections in Something Good About Me.',
    category: 'kindness',
    icon: 'Sparkles',
    achieved: false,
  },
  {
    id: 'mile_joint_care',
    title: 'Joint Protector',
    description: 'Followed clinician modifications for joint comfort.',
    category: 'movement',
    icon: 'ShieldCheck',
    achieved: false,
  },
];
