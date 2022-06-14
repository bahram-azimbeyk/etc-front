export class CoreComponent {
  id: string;
  name: string;
  component_type: string;
  is_hidden: boolean;
  order: number;
  components: any[];
}
export class CoreWindow {
  id: string;
  name: string;
  is_hidden: boolean;
  window_type: string;
  tab_title: string;
  slug: string;
  theme: string;
  language: string; //server just sends a string
  components: any[];
}
export class Language {
  code: string;
  direction: string;
  icon: string;
  name: string;
}
export class CoreDropdown extends CoreComponent {}
export class CoreDropDownItem extends CoreComponent {
  attrs: {
    text: string;
    icon: string;
    url: string;
  };
}
export class CoreNavbar extends CoreComponent {
  attrs: {
    brand: string;
    brand_link: string;
    align_item: string;
  };
}
export class CoreNavbarItem extends CoreComponent {
  attrs: {
    is_minimized: boolean;
    text: string;
    icon: string;
    item_type: string;
    tooltip: string;
    style: string;
    url: string;
  };
}
export class CoreHeader extends CoreComponent {
  attrs: {
    title: string;
    motto: string;
    logo_filename: string;
    anim_filename: string;
    picture_filename: string;
  };
}
export class CoreHeaderButton extends CoreComponent {
  attrs: {
    title: string;
    link: string;
  };
}
export class CoreBody extends CoreComponent {}
export class CoreFooter extends CoreComponent {}
export class CoreFooterColumn extends CoreComponent {
  attrs: {
    title: string;
    grid: string;
  };
}
export class CoreFooterLink extends CoreComponent {
  attrs: {
    text: string;
    url: string;
  };
}
export class CoreExpansionBox extends CoreComponent {
  attrs: {
    title: string;
  };
}
export class CoreSnakBar extends CoreComponent {}
export class CoreExpansionPanel extends CoreComponent {
  attrs: {
    title: string;
    text: string;
  };
}
export class CoreVideo extends CoreComponent {
  attrs: {
    video_filename: string;
  }
}
export class CoreCardBox extends CoreComponent {}
export class CoreCardBoxColumn extends CoreComponent {
  attrs: {
    grid: string;
    orientation: string;
  };
}

export class CoreCard extends CoreComponent {
  attrs: {
    picture_filename1: string;
    title: string;
    text: string;
    link: string;
    link_text: string;
  };
}
export class CoreFooterText extends CoreComponent {
  attrs: { text: string };
}
export class CoreFooterPicture extends CoreComponent {
  attrs: {
    picture_filename: string;
    url: string;
  };
}
export class CoreHeading extends CoreComponent {
  attrs: {
    title: string;
    text: string;
    align_text: string;
  };
}
export class CoreSection extends CoreComponent {
  attrs: {
    title: string;
    text: string;
    align_text: string;
    link: string;
    link_text: string;
    background_picture_filename: string;
    picture_filename: string;
    anim_filename: string;
    picture_position: string;
  };
}
export class CoreForm extends CoreComponent {
  attrs: {
    title: string;
    text: string;
    method: string;
    submit_text: string;
  };
}
export class CoreInput extends CoreComponent {
  attrs: {
    grid: string;
    label: string;
    input_type: string;
    value: string;
    pattern: string;
    pattern_message: string;
    placeholder: string;
    required: boolean;
  };
}
export class CoreInputOption extends  CoreComponent {
  attrs:{
    value: string;
  }
}
