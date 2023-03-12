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
  hero_id: string,
  hero_name: string,
  armor_level: number,
  race_bound: string,
  skill: TavernHeroSkill,
  buddy: TavernBuddy,
}

declare interface TavernHeroSkill {
  skill_id: string,
  skill_name: string,
  skill_cost: string,
  skill_info: string,
  associated?: TavernHeroSkill[],
}