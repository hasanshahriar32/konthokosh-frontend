export const POST_STRINGS = {
  // Titles and headers
  createNewPost: "নতুন পোস্ট তৈরি করুন",
  editDraft: "ড্রাফট সম্পাদনা করুন",
  contentEditorTitle: "কনটেন্ট সম্পাদক",

  // Labels & placeholders
  titleLabel: "পোস্ট শিরোনাম",
  titlePlaceholder: "আপনার পোস্টের জন্য আকর্ষণীয় একটি শিরোনাম লিখুন...",
  titleRequired: "শিরোনাম আবশ্যক",
  titleTooLong: "শিরোনামের দৈর্ঘ্য ২০০ অক্ষরের চেয়ে কম হতে হবে",

  tagsLabel: "ট্যাগসমূহ",
  tagsPlaceholder: "ট্যাগ যোগ করুন (Enter বা comma চাপুন)...",
  tagsHelp: "প্রাসঙ্গিক ট্যাগ যোগ করুন যাতে অন্যরা আপনার কনটেন্ট খুঁজে পায়",

  visibilityLabel: "দৃশ্যমানতা",

  postLabel: "পোস্ট কনটেন্ট",
  postPlaceholder:
    "আপনার পোস্ট লেখা শুরু করুন... Markdown, ছবি, টেবিল, কোড ব্লক ইত্যাদি ব্যবহার করতে পারবেন!",
  postRequired: "কনটেন্ট আবশ্যক",
  postSupport: "Markdown, ছবি, টেবিল, কোড ব্লক সহ বিভিন্ন কনটেন্ট সমর্থিত",

  saveDraft: "ড্রাফট হিসেবে সংরক্ষণ করুন",
  createPost: "পোস্ট তৈরি করুন",
  publishPost: "পোস্ট প্রকাশ করুন",

  // inline action states used by buttons
  creating: "তৈরি করা হচ্ছে...",
  publishing: "প্রকাশ করা হচ্ছে...",

  characters: "অক্ষর",

  // Status / dialog related strings (Bangla)
  statusTitle: "প্রক্রিয়ার অবস্থা",
  statusDescription: "আপনার পোস্টের বর্তমান অবস্থা এবং লেনদেনের তথ্য এখানে দেখানো হবে।",
  idLabel: "আইডি:",
  approvedLabel: "অনুমোদিত:",
  yes: "হ্যাঁ",
  no: "না",
  goNow: "এখন যান",
  close: "বন্ধ করুন",

  // Per-step labels and messages (distinguishable)
  statuses: {
    submittingLabel: "সাবমিশন (সার্ভারে পোস্ট তৈরি)",
    onchainLabel: "চেইনে জমা ও প্রক্রিয়াজাত",
    completedLabel: "সম্পূর্ণ হয়েছে",
    errorLabel: "ত্রুটি ঘটেছে",
    notSubmittedLabel: "চেইনে জমা দেওয়া হয়নি",
  },

  steps: {
    // step: post creation on KonthoKosh API
    creation: {
      label: "পোস্ট তৈরি করা হচ্ছে",
      loadingMessage: "KonthoKosh সার্ভারে পোস্ট তৈরি করা হচ্ছে...",
      successMessage: "পোস্ট সফলভাবে তৈরি হয়েছে।",
      errorMessage: "পোস্ট তৈরি করতে সমস্যা হয়েছে।",
    },

    // step: submit to blockchain (transaction submission)
    submitToChain: {
      label: "চেইনে জমা দেওয়া হচ্ছে",
      loadingMessage: "চেইনে জমা দেওয়া হচ্ছে...",
      successMessage: "ট্রানজ্যাকশন জমা হয়েছে।",
      errorMessage: "চেইনে জমা দেওয়ার সময় ত্রুটি।",
    },

    // step: blockchain / IPFS processing and verification
    chainProcessing: {
      label: "চেইন প্রক্রিয়াজাত",
      loadingMessage: "IPFS এবং চেইন যাচাই করা হচ্ছে...",
      successMessage: "চেইন প্রক্রিয়াজাত সম্পন্ন হয়েছে।",
      errorMessage: "চেইন প্রক্রিয়াজাতে ত্রুটি ঘটেছে।",
    },

    // step: image (cover) generation
    imageGeneration: {
      label: "কভার ইমেজ তৈরি",
      loadingMessage: "কভার ইমেজ তৈরি করা হচ্ছে...",
      successMessage: "কভার ইমেজ তৈরি হয়েছে।",
      errorMessage: "কভার ইমেজ তৈরি করতে সমস্যা হয়েছে।",
    },
  },

  // Small UI bits used in dialog
  copyId: "আইডি কপি করুন",
  copied: "কপি করা হয়েছে",
  txnLabel: "লেনদেন:",
  onChainIdLabel: "অন-চেইন আইডি:",
  ipfsLabel: "IPFS:",
  similarityLabel: "সাদৃশ্য",
  generatedCoversLabel: "তৈরি করা কভার ইমেজগুলি",
  applySelectedCovers: "নির্বাচিত কভার প্রয়োগ করুন",

  // Popover / explain & summary strings
  popover: {
    summaryTitle: "সারসংক্ষেপ",
    explainTitle: "ব্যাখ্যা করুন",
    loading: "লোড হচ্ছে...",
    error: "ত্রুটি ঘটেছে",
    nothing: "কিছু নেই।",
    headerTitle: "সারসংক্ষেপ ও ব্যাখ্যা",
    headerSubtitle: "পোস্টের মূল ধারণা বা ব্যাখ্যা দ্রুত দেখুন",
  },

  // Covers applied
  coversAppliedSuccess: "কভার সফলভাবে প্রয়োগ করা হয়েছে।",

  // UI strings for post load / empty states
  noPostsAvailable: "কোনো পোস্ট পাওয়া যায়নি",
  loadErrorFallback: "পোস্ট লোড করা যায়নি। অনুগ্রহ করে পরে আবার চেষ্টা করুন।",
  goToTop: "উপরে যান",
  // Additional localized UI strings used across post-related components
  noPostsTitle: "আপনার কোন পোস্ট নেই",
  noPostsSearch: "আপনার অনুসন্ধানের সাথে মেলে এমন কোনো পোস্ট পাওয়া যায়নি।",
  noPostsYet: "এখনও কোনো পোস্ট তৈরি করা হয়নি — প্রথম লেখক হোন!",
  writeButton: "লিখুন",
  browseCommunity: "কমিউনিটির পোস্ট দেখুন",
};
