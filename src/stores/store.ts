import { Storage } from "@ionic/storage";

const store = new Storage();
await store.create();

export { store };
