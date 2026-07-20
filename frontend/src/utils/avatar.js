const avatars = [
  "/avatars/anteater.svg",
  "/avatars/bear.svg",
  "/avatars/beaver.svg",
  "/avatars/boar.svg",
  "/avatars/capybara.svg",
  "/avatars/cat.svg",
  "/avatars/cow.svg",
  "/avatars/fennec.svg",
  "/avatars/goat.svg",
  "/avatars/guinea.svg",
  "/avatars/hedgehog.svg",
  "/avatars/horse.svg",
  "/avatars/hyena.svg",
  "/avatars/kangaroo.svg",
  "/avatars/koala.svg",
  "/avatars/lion.svg",
  "/avatars/mink.svg",
  "/avatars/mole.svg",
  "/avatars/mouse.svg",
  "/avatars/panda.svg",
  "/avatars/pig.svg",
  "/avatars/platypus.svg",
  "/avatars/rabbit.svg",
  "/avatars/sheep.svg",
  "/avatars/skunk.svg",
  "/avatars/sloth.svg",
  "/avatars/squid.svg",
  "/avatars/tiger.svg",
];

export function getAvatar(username) {
  let hash = 0;

  for (let i = 0; i < username.length; i++) {
    hash += username.charCodeAt(i);
  }

  return avatars[hash % avatars.length];
}
