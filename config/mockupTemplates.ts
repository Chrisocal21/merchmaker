export interface MockupTemplate {
  key: string;
  label: string;
  mockupSrc: string;
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
    canvasSize: { width: 2000, height: 2000 },
    printArea: { x: 1150, y: 650, width: 400, height: 400 },
  },
  tee_full_back: {
    key: "tee_full_back",
    label: "Tee – Full Back",
    mockupSrc: "/mockups/tee_back.svg",
    canvasSize: { width: 2000, height: 2000 },
    printArea: { x: 600, y: 400, width: 800, height: 1000 },
  },
  hoodie_front_left_chest: {
    key: "hoodie_front_left_chest",
    label: "Hoodie – Front Left Chest",
    mockupSrc: "/mockups/hoodie_front.svg",
    canvasSize: { width: 2000, height: 2000 },
    printArea: { x: 1150, y: 750, width: 350, height: 350 },
  },
  hoodie_full_back: {
    key: "hoodie_full_back",
    label: "Hoodie – Full Back",
    mockupSrc: "/mockups/hoodie_back.svg",
    canvasSize: { width: 2000, height: 2000 },
    printArea: { x: 600, y: 500, width: 800, height: 900 },
  },
};

export const mockupTemplateList = Object.values(mockupTemplates);
