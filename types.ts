
export enum ProjectStatus {
  PLANNING = '规划中',
  DESIGNING = '设计中',
  REVIEWING = '评审中',
  COMPLETED = '已完成'
}

export interface CabinetParams {
  width: number;
  depth: number;
  height: number;
  voltage: string;
  type: string;
  circuitType: string;
}

export interface Project {
  id: string;
  name: string;
  wbs: string;
  status: ProjectStatus;
  progress: number;
  customer: string;
  updatedAt: string;
}

export interface Material {
  id: string;
  name: string;
  model: string;
  brand: string;
  category: string;
  stock: number;
  price: string;
  unit: string;
  thumbnail: string;
  status?: 'approved' | 'pending';
}

export interface BOMItem {
  id: string;
  partNumber: string;
  name: string;
  spec: string;
  quantity: number;
  unit: string;
  category: '元器件' | '辅材' | '铜排' | '标准件';
}

export interface StandardTemplate {
  id: string;
  name: string;
  code: string;
  type: string;
  description: string;
  tags: string[];
  imageUrl: string;
  status?: 'approved' | 'pending';
}

export enum WorkflowStep {
  MISSION_RECEPTION = 0,
  PROJECT_CREATION = 1,
  CABINET_SELECTION = 2,
  PARAMETRIC_DESIGN = 3,
  BUSBAR_DESIGN = 4,
  MAIN_BUSBAR_ASSEMBLY = 5,
  OUTPUT_EXPORT = 6
}

export type TabType =
  | 'overview' | 'projects' | 'temp-projects'
  | 'selection-platform' | 'busbar-master' | 'busbar-conv'
  | 'standards' | 'materials'
  | 'ai-assistant' | 'bom-compare' | 'drc';

export type StandardCategory = '中压柜' | '低压柜' | '箱变';
