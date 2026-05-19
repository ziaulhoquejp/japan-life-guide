export const translations = {
  en: {
    nav: {
      schools: 'Schools',
      visa: 'Visa',
      chat: 'Sakura AI',
      community: 'Community',
      dashboard: 'Dashboard',
      blog: 'Blog',
      contact: 'Contact',
      pricing: 'Pricing',
      profile: 'Profile',
      login: 'Login',
      joinFree: 'Join Free',
    },
    home: {
      title: 'Your Journey to Japan Starts Here',
      subtitle: 'Find language schools, navigate visas, get AI guidance',
      findSchools: 'Find Schools',
      askSakura: 'Ask Sakura AI',
    },
    schools: {
      title: 'Language Schools',
      search: 'Search schools...',
      found: 'schools found',
    },
    common: {
      loading: 'Loading...',
      back: 'Back',
      save: 'Save',
      apply: 'Apply Now',
    }
  },
  bn: {
    nav: {
      schools: 'School',
      visa: 'Visa',
      chat: 'Sakura AI',
      community: 'Community',
      dashboard: 'Dashboard',
      blog: 'Blog',
      contact: 'Contact',
      pricing: 'Mulyo',
      profile: 'Profile',
      login: 'Login',
      joinFree: 'Binamulye Jog Din',
    },
    home: {
      title: 'Japan-e Apnar Jatra Shuru Hok',
      subtitle: 'Bhasha school khujun, visa guide pan, AI sahayata nin',
      findSchools: 'School Khujun',
      askSakura: 'Sakura-ke Jiggesh Korun',
    },
    schools: {
      title: 'Bhasha Schoolsamuh',
      search: 'School khujun...',
      found: 'ti school pawa geche',
    },
    common: {
      loading: 'Load hochhe...',
      back: 'Pichone',
      save: 'Songrokkhon Korun',
      apply: 'Abedon Korun',
    }
  },
  ne: {
    nav: {
      schools: 'Vidyalaya',
      visa: 'Visa',
      chat: 'Sakura AI',
      community: 'Samuday',
      dashboard: 'Dashboard',
      blog: 'Blog',
      contact: 'Sampark',
      pricing: 'Mulya',
      profile: 'Profile',
      login: 'Login',
      joinFree: 'Nisulka Samel Hunuhos',
    },
    home: {
      title: 'Japan-ma Tapainko Yatra Suru Huncha',
      subtitle: 'Bhasha vidyalaya khojnuhos, visa guide paunuhos',
      findSchools: 'Vidyalaya Khojnuhos',
      askSakura: 'Sakura-lai Sodhnuhos',
    },
    schools: {
      title: 'Bhasha Vidyalayaharu',
      search: 'Vidyalaya khojnuhos...',
      found: 'vidyalayaharu fela paryo',
    },
    common: {
      loading: 'Load hudaicha...',
      back: 'Pachadi',
      save: 'Surakshit Garnuhos',
      apply: 'Aavedan Dinuhos',
    }
  },
  jp: {
    nav: {
      schools: 'Gakko',
      visa: 'Biza',
      chat: 'Sakura AI',
      community: 'Komyuniti',
      dashboard: 'Dasshubodo',
      blog: 'Burogu',
      contact: 'Otoiawase',
      pricing: 'Ryokin',
      profile: 'Purofiru',
      login: 'Roguin',
      joinFree: 'Muryo de Sanka',
    },
    home: {
      title: 'Nihon eno Tabi wa Koko kara Hajimaru',
      subtitle: 'Gogakko wo sagashi, biza wo navigate, AI guidance wo shutoku',
      findSchools: 'Gakko wo Sagasu',
      askSakura: 'Sakura ni Kiku',
    },
    schools: {
      title: 'Gogakko Ichiran',
      search: 'Gakko wo kensaku...',
      found: 'ko ga mitsukarimasita',
    },
    common: {
      loading: 'Yomikomi chu...',
      back: 'Modoru',
      save: 'Hozon',
      apply: 'Moushikomu',
    }
  }
}

export type Language = 'en' | 'bn' | 'ne' | 'jp'

export function getTranslation(lang: Language) {
  return translations[lang] || translations.en
}