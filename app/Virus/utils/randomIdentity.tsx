export const identityCharacters = [
	'biker',
	'chix',
	'dapper',
	'hippy',
	'hipster',
	'mumma',
	'punk',
	'rasta',
	'rocker',
] as const;

export type T_IdentityCharacter = typeof identityCharacters[number];

export type T_RandomIdentity = {
	character: T_IdentityCharacter;
	label: string;
	svg: string;
	name: string;
};

type T_IdentityProfile = {
	label: string;
	lead: string[];
	tail: string[];
};

const identityProfiles: Record<T_IdentityCharacter, T_IdentityProfile> = {
	biker: {
		label: 'Biker',
		lead: ['Chrome', 'Dust', 'Throttle', 'Axle', 'Rider', 'Torque'],
		tail: ['Vega', 'Rook', 'Blaze', 'Riot', 'Vale', 'Stone'],
	},
	chix: {
		label: 'Chix',
		lead: ['Candy', 'Nova', 'Velvet', 'Lola', 'Cherry', 'Disco'],
		tail: ['Star', 'Bloom', 'Fever', 'Jet', 'Dawn', 'Muse'],
	},
	dapper: {
		label: 'Dapper',
		lead: ['Sterling', 'Marlow', 'Velour', 'Cinder', 'Basil', 'Crispin'],
		tail: ['Fox', 'Monroe', 'Locke', 'Saint', 'Vale', 'Beau'],
	},
	hippy: {
		label: 'Hippy',
		lead: ['Saffron', 'River', 'Clover', 'Sage', 'Lotus', 'Willow'],
		tail: ['Skye', 'Meadow', 'Bloom', 'Rain', 'Echo', 'Sun'],
	},
	hipster: {
		label: 'Hipster',
		lead: ['Indie', 'Polaroid', 'Cedar', 'Juniper', 'Miso', 'Pixel'],
		tail: ['North', 'Ray', 'Atlas', 'Lane', 'Lowe', 'Quill'],
	},
	mumma: {
		label: 'Mumma',
		lead: ['Honey', 'Sunny', 'Mabel', 'Coco', 'Peaches', 'Ruby'],
		tail: ['Belle', 'Joy', 'Rose', 'Dove', 'Pearl', 'Love'],
	},
	punk: {
		label: 'Punk',
		lead: ['Static', 'Razor', 'Chaos', 'Neon', 'Spike', 'Vandal'],
		tail: ['Hex', 'Crash', 'Zero', 'Fang', 'Riot', 'Vice'],
	},
	rasta: {
		label: 'Rasta',
		lead: ['Lion', 'Zion', 'Marley', 'Irie', 'Dread', 'Mellow'],
		tail: ['Wave', 'Soul', 'Sun', 'Groove', 'Root', 'Drift'],
	},
	rocker: {
		label: 'Rocker',
		lead: ['Amp', 'Vinyl', 'Jett', 'Slash', 'Echo', 'Reverb'],
		tail: ['Steel', 'Storm', 'Knox', 'Crow', 'Rush', 'Flint'],
	},
};

const randomInt = (min: number, max: number) =>
	Math.floor(Math.random() * (max - min + 1)) + min;

const randomItem = <T,>(items: readonly T[]): T => items[randomInt(0, items.length - 1)];

export function randomIdentityProfile(character?: T_IdentityCharacter): T_RandomIdentity {
	const resolvedCharacter = character ?? randomItem(identityCharacters);
	const profile = identityProfiles[resolvedCharacter];
	const name = `${randomItem(profile.lead)} ${randomItem(profile.tail)}-${randomInt(7, 99)}`;

	return {
		character: resolvedCharacter,
		label: profile.label,
		svg: `/shared/svg/characters/${resolvedCharacter}.svg`,
		name,
	};
}

export function randomIdentity(character?: T_IdentityCharacter): string {
	return randomIdentityProfile(character).name;
}
