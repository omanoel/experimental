export interface Dataset {
  _projects: Project[];
  chartData?: any;
}

export interface Project {
  uid: string;
  name: string;
}
