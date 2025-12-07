export interface MockupTemplate {
  key: string;
  label: string;
  mockupSrc: string;
  overlaySrc?: string;
  canvasSize: {
    width: number;
    height: number;
  };
  printArea: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export const mockupTemplates: Record<string, MockupTemplate> = {
  tee_front_left_chest: {
    key: "tee_front_left_chest",
    label: "Tee – Front Left Chest",
    mockupSrc: "/mockups/tee_front.svg",
    canvasSize: { width: 740, height: 740 },
    printArea: { x: 130, y: 250, width: 100, height: 100 },
  },
  tee_full_back: {
    key: "tee_full_back",
    label: "Tee – Full Back",
    mockupSrc: "/mockups/tee_back.svg",
    canvasSize: { width: 740, height: 740 },
    printArea: { x: 445, y: 200, width: 180, height: 250 },
  },
  hoodie_front_left_chest: {
    key: "hoodie_front_left_chest",
    label: "Hoodie – Front Left Chest",
    mockupSrc: "/mockups/hoodie_front.jpg",
    canvasSize: { width: 800, height: 450 },
    printArea: { x: 460, y: 160, width: 100, height: 100 },
  },
  hoodie_full_back: {
    key: "hoodie_full_back",
    label: "Hoodie – Full Back",
    mockupSrc: "/mockups/hoodie_back.jpg",
    canvasSize: { width: 800, height: 450 },
    printArea: { x: 107, y: 110, width: 180, height: 250 },
  },
  coin_center_engraving: {
    key: "coin_center_engraving",
    label: "Coin – Center Engraving",
    mockupSrc: "/mockups/coin.jpg.png",
    canvasSize: { width: 768, height: 768 },
    printArea: { x: 234, y: 179, width: 300, height: 300 },
  },
};

export const mockupTemplateList = Object.values(mockupTemplates);
