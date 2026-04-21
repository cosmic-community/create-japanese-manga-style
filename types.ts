export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

export interface Character extends CosmicObject {
  type: 'characters';
  metadata: {
    name?: string;
    role?: string;
    appearance?: string;
    personality?: string;
    reference_image?: {
      url: string;
      imgix_url: string;
    };
  };
}

export interface ComicPage extends CosmicObject {
  type: 'comic-pages';
  metadata: {
    page_number?: number;
    page_title?: string;
    story_title?: string;
    scene_description?: string;
    panels?: string;
    featured_characters?: Character[];
    page_artwork?: {
      url: string;
      imgix_url: string;
    };
    art_style_notes?: string;
    is_cliffhanger?: boolean;
  };
}

export interface CosmicResponse<T> {
  objects: T[];
  total: number;
}