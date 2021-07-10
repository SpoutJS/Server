export const parsers = {
	parsers: [
		{
			parser: 'minecraft:resource_location',
			modifier: null,
			examples: [],
		},
		{
			parser: 'brigadier:string',
			modifier: {
				type: 'greedy',
			},
			examples: ['word', 'words with spaces', '\\" and symbols\\"'],
		},
		{
			parser: 'minecraft:entity',
			modifier: {
				amount: 'multiple',
				type: 'players',
			},
			examples: ['@a'],
		},
		{
			parser: 'brigadier:double',
			modifier: null,
			examples: [],
		},
		{
			parser: 'brigadier:string',
			modifier: {
				type: 'phrase',
			},
			examples: ['\\"quoted phrase\\"', 'word', ''],
		},
		{
			parser: 'minecraft:uuid',
			modifier: null,
			examples: [],
		},
		{
			parser: 'minecraft:entity',
			modifier: {
				amount: 'single',
				type: 'entities',
			},
			examples: ['@p'],
		},
		{
			parser: 'minecraft:message',
			modifier: null,
			examples: [],
		},
		{
			parser: 'minecraft:game_profile',
			modifier: null,
			examples: [
				'Player',
				'0123',
				'dd12be42-52a9-4a91-a8a1-11c01849e498',
				'@e',
			],
		},
		{
			parser: 'brigadier:string',
			modifier: {
				type: 'word',
			},
			examples: ['word', 'word_with_underscore'],
		},
		{
			parser: 'minecraft:component',
			modifier: null,
			examples: [
				'"hello world"',
				'""',
				'"{"text":"hello world"}"',
				'[""]',
			],
		},
		{
			parser: 'brigadier:integer',
			modifier: {
				min: 1,
			},
			examples: ['1'],
		},
		{
			parser: 'brigadier:integer',
			modifier: {
				min: 0,
			},
			examples: ['0', '1'],
		},
		{
			parser: 'brigadier:bool',
			modifier: null,
			examples: ['true', 'false'],
		},
		{
			parser: 'minecraft:item_predicate',
			modifier: null,
			examples: [
				'stick',
				'minecraft:stick',
				'#stick',
				'diamond_sword{ench:[{id:16,lvl:5}]}',
			],
		},
		{
			parser: 'minecraft:block_predicate',
			modifier: null,
			examples: [
				'stone',
				'minecraft:stone',
				'#stone',
				'minecraft:redstone_wire[power=15,north=up,south=side]',
				'minecraft:furnace[facing=north]{BurnTime:200}',
			],
		},
		{
			parser: 'minecraft:block_pos',
			modifier: null,
			examples: ['0 0 0', '~ ~ ~', '^ ^ ^', '^1 ^ ^-5', '~0.5 ~1 ~-5'],
		},
		{
			parser: 'minecraft:nbt_path',
			modifier: null,
			examples: [],
		},
		{
			parser: 'minecraft:nbt_compound_tag',
			modifier: null,
			examples: [],
		},
		{
			parser: 'minecraft:nbt_tag',
			modifier: null,
			examples: [],
		},
		{
			parser: 'brigadier:integer',
			modifier: null,
			examples: ['1', '0', '10'],
		},
		{
			parser: 'minecraft:mob_effect',
			modifier: null,
			examples: [],
		},
		{
			parser: 'minecraft:entity',
			modifier: {
				amount: 'multiple',
				type: 'entities',
			},
			examples: [
				'@e',
				'@e[type=cow]',
				'dd12be42-52a9-4a91-a8a1-11c01849e498',
				'Player',
			],
		},
		{
			parser: 'brigadier:integer',
			modifier: {
				min: 0,
				max: 255,
			},
			examples: ['0', '255'],
		},
		{
			parser: 'brigadier:integer',
			modifier: {
				min: 1,
				max: 1000000,
			},
			examples: ['1', '1000000'],
		},
		{
			parser: 'minecraft:item_enchantment',
			modifier: null,
			examples: ['unbreaking', 'minecraft:slik_touch'],
		},
		{
			parser: 'minecraft:swizzle',
			modifier: null,
			examples: [],
		},
		{
			parser: 'minecraft:entity_anchor',
			modifier: null,
			examples: ['eyes', 'feet'],
		},
		{
			parser: 'minecraft:vec3',
			modifier: null,
			examples: [],
		},
		{
			parser: 'minecraft:objective',
			modifier: null,
			examples: [],
		},
		{
			parser: 'minecraft:score_holder',
			modifier: {
				amount: 'single',
			},
			examples: [],
		},
		{
			parser: 'minecraft:int_range',
			modifier: null,
			examples: ['0..5', '0', '-5', '-100..', '..100'],
		},
		{
			parser: 'minecraft:dimension',
			modifier: null,
			examples: [
				'minecraft:overworld',
				'minecraft:the_nether',
				'minecraft:the_end',
				'overworld',
				'the_end',
				'the_nether',
			],
		},
		{
			parser: 'minecraft:rotation',
			modifier: null,
			examples: [],
		},
		{
			parser: 'minecraft:score_holder',
			modifier: {
				amount: 'multiple',
			},
			examples: [],
		},
		{
			parser: 'minecraft:entity',
			modifier: {
				amount: 'single',
				type: 'players',
			},
			examples: ['@p'],
		},
		{
			parser: 'minecraft:block_state',
			modifier: null,
			examples: [
				'stone',
				'minecraft:stone',
				'minecraft:redstone_wire[power=15,north=up,south=side]',
				'minecraft:furnace[facing=north]{BurnTime:200}',
			],
		},
		{
			parser: 'minecraft:column_pos',
			modifier: null,
			examples: ['0 0', '~ ~', '~1 ~-2', '^ ^', '^-1 ^0'],
		},
		{
			parser: 'minecraft:function',
			modifier: null,
			examples: ['foo', 'foo:bar', '#foo'],
		},
		{
			parser: 'minecraft:item_stack',
			modifier: null,
			examples: [],
		},
		{
			parser: 'minecraft:item_slot',
			modifier: null,
			examples: [],
		},
		{
			parser: 'brigadier:float',
			modifier: {
				min: 0.0,
			},
			examples: ['0.0', '0', '1', '0.01'],
		},
		{
			parser: 'minecraft:particle',
			modifier: null,
			examples: [],
		},
		{
			parser: 'brigadier:float',
			modifier: {
				min: 0.0,
				max: 1.0,
			},
			examples: ['0.0', '0', '1', '1.0', '0.5'],
		},
		{
			parser: 'brigadier:float',
			modifier: {
				min: 0.0,
				max: 2.0,
			},
			examples: ['0', '2', '1.0', '2.0'],
		},
		{
			parser: 'brigadier:integer',
			modifier: {
				min: 0,
				max: 65535,
			},
			examples: ['0', '65535'],
		},
		{
			parser: 'brigadier:integer',
			modifier: {
				min: 1,
				max: 64,
			},
			examples: ['1', '64'],
		},
		{
			parser: 'minecraft:time',
			modifier: null,
			examples: [],
		},
		{
			parser: 'minecraft:objective_criteria',
			modifier: null,
			examples: [],
		},
		{
			parser: 'minecraft:scoreboard_slot',
			modifier: null,
			examples: [],
		},
		{
			parser: 'minecraft:operation',
			modifier: null,
			examples: [],
		},
		{
			parser: 'minecraft:angle',
			modifier: null,
			examples: ['0', '~', '~-0.5'],
		},
		{
			parser: 'brigadier:float',
			modifier: {
				min: 1.0,
			},
			examples: ['1', '1.0', '1.000'],
		},
		{
			parser: 'minecraft:vec2',
			modifier: null,
			examples: [],
		},
		{
			parser: 'minecraft:entity_summon',
			modifier: null,
			examples: ['minecraft:pig', 'cow'],
		},
		{
			parser: 'minecraft:team',
			modifier: null,
			examples: [],
		},
		{
			parser: 'minecraft:color',
			modifier: null,
			examples: [
				'aqua',
				'black',
				'blue',
				'dark_aqua',
				'dark_blue',
				'dark_gray',
				'dark_green',
				'dark_purple',
				'dark_red',
				'gold',
				'gray',
				'green',
				'light_purple',
				'red',
				'reset',
				'yellow',
				'white',
			],
		},
		{
			parser: 'brigadier:integer',
			modifier: {
				min: 0,
				max: 1000000,
			},
			examples: ['0', '1000000'],
		},
		{
			parser: 'brigadier:float',
			modifier: {
				min: -60000000.0,
				max: 60000000.0,
			},
			examples: [],
		},
	],
};
