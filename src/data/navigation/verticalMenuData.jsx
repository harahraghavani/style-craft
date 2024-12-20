const verticalMenuData = (dictionary = {}) => {
  const nav = dictionary.navigation || {};

  return [
    {
      id: "discover",
      label: "Discover",
      href: "/",
      icon: "tabler-world",
    },
    {
      id: "playground",
      label: "Playground",
      icon: "tabler-edit",
      children: [
        {
          label: nav.boxShadow || "Box Shadow",
          icon: "tabler-point",
          href: "/playground/box-shadow",
        },
      ],
    },
    {
      id: "your-feed",
      label: "Your Feed",
      icon: "tabler-user",
      children: [
        {
          label: nav.boxShadow || "Box Shadow",
          icon: "tabler-point",
          href: "/your-feed/box-shadow",
        },
      ],
    },
  ];
};

export default verticalMenuData;
