const HeaderNavLinks = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About",
    href: "/about",
  }
];

const HomePage = {
  metadata: {
    metadataBase: new URL("https://goldpumpkin.life"),
    title: {
      default: "Gold's Blog",
      template: `%s | Gold's Blog`,
    },
    description: "A full-stack developer.记录生活，记录想法，带不走。",
  },
  title: "Gold",
  description: "A full-stack developer.记录生活，记录想法，带不走。",
  url: "https://goldpumpkin.life",
};

const AboutPage = {
  metadata: { title: "About", description: "That is all about me." },
};

export { HeaderNavLinks, HomePage, AboutPage};
