declare interface Card { // 卡牌
  card_name: string,
  card_id: string,
  golden_id?: string,
  golden_card: Card,
  version?: string,
  associated_ids?: string[],
  associated_cards: Card[],
}

declare interface TavernBuddy { // 卡牌
  buddy_id: string,
  buddy_name: string,
  buddy_info: string,
}

declare interface Hero {
  id: string,
  name: string,
  health: number,
  armor: number,
  raceBound: Race,
  heroSkillId: string,
  hero_skins: HeroSkin[],
  associatedCardId: string,
  skill: TavernHeroSkill,
  has_buddy: boolean,
  buddies_id: string,
  golden_buddy_id: string,
}

declare type Race = 'BEAST' | 'MECH' | 'QUILBOAR' | 'DEMON' | 'DRAGON' | 'MERLOC' | 'NAGA' | 'PIRATE' | 'UNDEAD' | 'ALL';

declare interface HeroSkin {
  skin_id: string,
  skin_name: string,
}

declare interface TavernHeroSkill {
  skill_id: string,
  skill_name: string,
  skill_cost: string,
  skill_info: string,
  associated?: TavernHeroSkill[],
}