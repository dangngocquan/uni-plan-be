export enum LetterGrade {
  F = 'F',
  D = 'D',
  D_PLUS = 'D+',
  C = 'C',
  C_PLUS = 'C+',
  B = 'B',
  B_PLUS = 'B+',
  A = 'A',
  A_PLUS = 'A+',
}

export enum LetterGradeCongratulations {
  EXCELLENT = 'EXCELLENT',
  VERY_GOOD = 'VERY_GOOD',
  GOOD = 'GOOD',
  ORDINARY = 'ORDINARY',
  POOR = 'POOR',
}

export enum FourPointGrade {
  F = 0,
  D = 1.0,
  D_PLUS = 1.5,
  C = 2.0,
  C_PLUS = 2.5,
  B = 3.0,
  B_PLUS = 3.5,
  A = 3.7,
  A_PLUS = 4.0,
}

export const CONVERT_LETTER_GRADE_TO_FOUR_POINT_GRADE = {
  F: 0,
  D: 1.0,
  'D+': 1.5,
  C: 2.0,
  'C+': 2.5,
  B: 3.0,
  'B+': 3.5,
  A: 3.7,
  'A+': 4.0,
};

export enum GradeConversionType {
  GRADE = 'GRADE',
  CONGRADUATION = 'CONGRADUATION',
}
