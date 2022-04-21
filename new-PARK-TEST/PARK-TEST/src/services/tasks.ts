import { Task } from "./types";

interface TaskContent {
  label: string;
  url: string;
  title: string;
  instruction: string;
}

const url = "https://youtu.be/TnlPtaPxXfc";

export const taskToContent = new Map<Task, TaskContent>([
  [
    Task.quick_brown_fox,
    {
      label: "QUICK BROWN FOX",
      url: "https://youtu.be/ePwWEAA5nsM",
      title: "Remain at rest while reciting the following:",
      instruction:
        "The quick brown fox jumps over the lazy dog. The dog wakes up and follows the fox into the forest, but again the quick brown fox jumps over the lazy dog.",
    },
  ],
  [Task.resting_face,
  {
    label: "RESTING FACIAL EXPRESSION",
    url: "https://youtu.be/zba6ehMP3e8",
    title: "Remain at rest for 10 seconds without talking. Make sure your face is being recorded in the frame.",
    instruction: ""
  }
  ],
  [
    Task.eye_gaze,
    {
      label: "EYE GAZE",
      url: "https://youtu.be/7rEI3xNLeSk",
      title: "Instructions",
      instruction: "Follow the movement of the blue square with your eyes only – don’t move your head or neck."
      ,
    },
  ],
  [
    Task.finger_tapping_left,
    {
      label: "FINGER TAPPING - LEFT",
      url: "https://youtu.be/ZcqAO0_gVOE",
      title: "Tap your index finger and thumb together on your LEFT hand 10 times as fast and as big as possible.",
      instruction: "DO NOT count out loud.",
    },
  ],
  [
    Task.finger_tapping_right,
    {
      label: "FINGER TAPPING - RIGHT",
      url: "https://youtu.be/1oMx4FgaQDM",
      title: "Tap your index finger and thumb together on your RIGHT hand 10 times as fast and as big as possible.",
      instruction: "DO NOT count out loud.",
    },
  ],
  [Task.ahhhh,
  {
    label: "AHHHH",
    url: "https://youtu.be/7KwfUvhxTQY",
    title: "Take a deep breath and then say \"ahhhh\" for as long as you can until you run out of breath.",
    instruction: "",
  }
  ],
  [Task.ooooo, { label: "OOOOO", url: "https://youtu.be/msPEfeGpFDQ", title: "Take a deep breath and say \"ooooo\" for as long as you can until you run out of breath.", instruction: "" }],
  [Task.eeeee, { label: "EEEEE", url: "https://youtu.be/s39ogFCRN0g", title: "Take a deep breath and say \"eeeee\" for as long as you can until you run out of breath.", instruction: "" }],
  [Task.reverse_count,
  {
    label: "REVERSE COUNTING",
    url: "https://youtu.be/l38slCwCZzI",
    title: "Count backwards from 20 to 0 out loud.",
    instruction: ""
  }
  ],
  [Task.head_pose,
  {
    label: "HEAD POSE",
    url: "https://youtu.be/uaIS9vcXe9I",
    title: "Slowly tilt your head up and then down, as if you are nodding \"yes\". Then, slowly turn you head left and then right, as if you are nodding \"no\".",
    instruction: ""
  }
  ],
  [
    Task.smile,
    {
      label: "SMILE",
      url: "https://youtu.be/teCMNwmPSuA",
      title: "Make the biggest smile you can followed by a neutral face. Slowly, Mimic this facial expression three times.",
      instruction: "",
    },
  ],
  [
    Task.disgust,
    {
      label: "DISGUST",
      url: "https://youtu.be/ujsKzLVub2w",
      title: "Make the most disgusted face you can followed by a neutral face. Slowly, Mimic this facial expression three times.",
      instruction: "",
    },
  ],
  [
    Task.surprise,
    {
      label: "SURPRISE",
      url: "https://youtu.be/kKskcldRAaU",
      title: "Raise your eyebrows up as high as you can and down as low as you can three times. Slowly, Mimic this facial expression three times.",
      instruction: ""
    },
  ],
  [
    Task.open_fist_left,
    {
      label: "OPEN FIST - LEFT",
      url: "https://youtu.be/GI2bNw5W0Kk",
      title: "Make a tight fist with your LEFT hand and keep your arm bent at the elbow. Open and close your LEFT hand 10 times as fast and as fully as possible.",
      instruction: "DO NOT count out loud.",
    },
  ],
  [
    Task.open_fist_right,
    {
      label: "OPEN FIST - RIGHT",
      url: "https://youtu.be/q6zXuXZ0nBM",
      title: "Make a tight fist with your RIGHT hand and keep your arm bent at the elbow. Open and close your RIGHT hand 10 times as fast and as fully as possible.",
      instruction: "DO NOT count out loud.",
    },
  ],
  [
    Task.flip_palm_left,
    {
      label: "FLIP PALM - LEFT",
      url: "https://youtu.be/4TfME-1sArc",
      title: "Extend your LEFT arm out in front of your body with the palm down. Turn your LEFT palm up and down alternately 10 times as fast and as fully as possible. ",
      instruction: "DO NOT count out loud.",
    },
  ],
  [
    Task.flip_palm_right,
    {
      label: "FLIP PALM - RIGHT",
      url: "https://youtu.be/FzVZDMxn_Vk",
      title: "Extend your RIGHT arm out in front of your body with the palm facing downwards. Turn your RIGHT palm up and down alternately 10 times as fast and as fully as possible.",
      instruction: "DO NOT count out loud.",
    },
  ],
  [
    Task.nose_touch_left,
    {
      label: "NOSE TOUCH - LEFT",
      url: "https://youtu.be/VgAlg8Yv9Qo",
      title: "Extend your LEFT hand and then touch your nose with your LEFT index finger. Hold your finger to your nose for 3 seconds.",
      instruction: "DO NOT count out loud.",
    },
  ],
  [
    Task.nose_touch_right,
    {
      label: "NOSE TOUCH - RIGHT",
      url: "https://youtu.be/IuWQirBU4s0",
      title: "Extend your RIGHT hand and then touch your nose with your RIGHT index finger. Hold your finger to your nose for 3 seconds.",
      instruction: "DO NOT count out loud.",
    },
  ],
  [
    Task.extend_arm,
    {
      label: "EXTEND ARMS",
      url: "https://youtu.be/QDy2WD3NOsQ",
      title: "Extend both of your arms out in front of your body with palms facing downwards. Hold this position for 10 seconds.",
      instruction: "",
    },
  ],
  [Task.tongue_twister,
  {
    label: "TONGUE TWISTER",
    url: "https://youtu.be/WzlVAdkyF_c",
    title: "Recite the following tongue twister 5 times as quickly as you can: \"Fresh French Fried Fly Fritters\"",
    instruction: ""
  }],
]);
