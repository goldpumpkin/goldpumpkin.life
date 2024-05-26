const HeaderNavLinks = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Blog",
    href: "/blog",
  }
];

const HomePage = {
  metadata: {
    // metadataBase: new URL("https://goldpumpkin.life"),
    title: {
      default: "Gold's Blog",
      template: `%s | Gold's Blog`,
    },
    description: "A full-stack developer.",
  },
  title: "Gold",
  description: "A full-stack developer.",
  // url: "https://goldpumpkin.life",
};

export { HeaderNavLinks, HomePage};
