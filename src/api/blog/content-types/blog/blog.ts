// Interface automatically generated by schemas-to-ts

import { Seo } from '../../../../components/shared/interfaces/Seo';
import { Media } from '../../../../common/schemas-to-ts/Media';
import { Seo_Plain } from '../../../../components/shared/interfaces/Seo';
import { Seo_NoRelations } from '../../../../components/shared/interfaces/Seo';
import { AdminPanelRelationPropertyModification } from '../../../../common/schemas-to-ts/AdminPanelRelationPropertyModification';

export interface Blog {
  id: number;
  attributes: {
    createdAt: Date;    updatedAt: Date;    publishedAt?: Date;    article?: any;
    title?: string;
    description?: string;
    seo?: Seo;
    cover?: { data: Media };
    locale: string;
    localizations?: { data: Blog[] };
  };
}
export interface Blog_Plain {
  id: number;
  createdAt: Date;  updatedAt: Date;  publishedAt?: Date;  article?: any;
  title?: string;
  description?: string;
  seo?: Seo_Plain;
  cover?: Media;
  locale: string;
  localizations?: Blog[];
}

export interface Blog_NoRelations {
  id: number;
  createdAt: Date;  updatedAt: Date;  publishedAt?: Date;  article?: any;
  title?: string;
  description?: string;
  seo?: Seo_NoRelations;
  cover?: number;
  locale: string;
  localizations?: Blog[];
}

export interface Blog_AdminPanelLifeCycle {
  id: number;
  createdAt: Date;  updatedAt: Date;  publishedAt?: Date;  article?: any;
  title?: string;
  description?: string;
  seo?: Seo_Plain;
  cover?: AdminPanelRelationPropertyModification<Media>;
  locale: string;
  localizations?: Blog[];
}
