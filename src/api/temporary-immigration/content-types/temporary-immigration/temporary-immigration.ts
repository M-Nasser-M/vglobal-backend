// Interface automatically generated by schemas-to-ts

import { Seo } from '../../../../components/shared/interfaces/Seo';
import { Seo_Plain } from '../../../../components/shared/interfaces/Seo';
import { Seo_NoRelations } from '../../../../components/shared/interfaces/Seo';

export interface TemporaryImmigration {
  id: number;
  attributes: {
    createdAt: Date;    updatedAt: Date;    publishedAt?: Date;    article?: any;
    seo?: Seo;
    locale: string;
    localizations?: { data: TemporaryImmigration[] };
  };
}
export interface TemporaryImmigration_Plain {
  id: number;
  createdAt: Date;  updatedAt: Date;  publishedAt?: Date;  article?: any;
  seo?: Seo_Plain;
  locale: string;
  localizations?: TemporaryImmigration[];
}

export interface TemporaryImmigration_NoRelations {
  id: number;
  createdAt: Date;  updatedAt: Date;  publishedAt?: Date;  article?: any;
  seo?: Seo_NoRelations;
  locale: string;
  localizations?: TemporaryImmigration[];
}

export interface TemporaryImmigration_AdminPanelLifeCycle {
  id: number;
  createdAt: Date;  updatedAt: Date;  publishedAt?: Date;  article?: any;
  seo?: Seo_Plain;
  locale: string;
  localizations?: TemporaryImmigration[];
}