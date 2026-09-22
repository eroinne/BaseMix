# Cocktail Knowledge Base

Everything Mixwheel teaches, in one document. It is written to be read on its own, and it is the
**single source of truth** for the app's data files (`src/data/*.ts`). If the two ever disagree,
this file wins.

- Volumes are given in **ml with oz in parentheses** (bar ounce = 30 ml).
- "Parts" ratios are written spirit-first, e.g. `2 : 0.75 : 0.75`.

---

## 1. How a cocktail is structured

Almost every drink is three things stacked on top of each other:

| Layer | Job | Typical ingredients |
|---|---|---|
| **Core** | the identity of the drink, 45–60 ml (1.5–2 oz) | base spirit, sometimes split between two |
| **Balance** | pushes back against the core | citrus, sugar, fortified wine, a carbonated lengthener |
| **Seasoning** | small, aromatic, decides the finish | bitters, absinthe rinse, a liqueur accent, the garnish |

A drink fails when one layer is missing, or when two layers fight for the same job — two loud amari,
or sugar *and* a sweet liqueur with no acid to cut them.

### Notes: the perfumer's view

Borrowed from perfumery, and the fastest way to predict whether a new combination will work:

- **Top notes** — first thing you smell, gone in a minute: citrus zest, mint, gin botanicals, soda lift.
- **Heart notes** — the body of the drink: fruit, herbs, vermouth, the spirit's fermented character.
- **Base notes** — what lingers: oak, vanilla, caramel, spice, sugar, nuts, cream, bitterness.

A complete cocktail has something in all three registers. A Daiquiri: lime oil and juice on top,
rum's cane heart, sugar and barrel underneath. Vodka + cranberry has heart only, which is why it
tastes flat — and why every good vodka drink adds citrus (top) and a real sweetener or liqueur (base).

---

## 2. The six root families

The framework from *Cocktail Codex* (Death & Co). Six root recipes; nearly every classic is a
variation on one of them. Learn the root and you can improvise the whole branch.

### 2.1 Old Fashioned — spirit + sugar + bitters + dilution
- **Formula:** 60 ml (2 oz) spirit · 7.5 ml (¼ oz) rich syrup or 1 sugar cube · 2–4 dashes bitters
- **Technique:** build and stir over a large piece of ice · **Glass:** rocks · **Garnish:** expressed citrus peel
- **Lesson:** balance. Nothing hides the spirit, so the spirit must be good and the dilution exact.
- **Branch:** Old Fashioned, Sazerac, Mint Julep, Caipirinha, Rusty Nail, Champagne Cocktail.
- **Substitutions:** any aged spirit works; the *sweetener* carries the personality (demerara →
  whiskey, cane → rum, agave → tequila). More assertive spirit, more bitters.

### 2.2 Martini — spirit + fortified/aromatized wine (± bitters)
- **Formula:** 60 ml (2 oz) spirit · 10–30 ml (⅓–1 oz) vermouth · optional bitters
- **Technique:** stir, strain · **Glass:** chilled coupe · **Garnish:** olive, twist, cherry
- **Lesson:** clarity and texture. No juice, no bubbles, nothing to hide behind.
- **Branch:** Dry Martini, Manhattan, Negroni, Boulevardier, Martinez, Vieux Carré, Hanky Panky, Vesper.
- **Substitutions:** dry vermouth ↔ bianco ↔ blanc aperitif for lighter spirits, sweet vermouth for
  aged ones. Vermouth is wine — it oxidises, so keep it in the fridge; a tired bottle ruins the drink.

### 2.3 Daiquiri — spirit + fresh citrus + sugar
- **Formula:** 60 ml (2 oz) spirit · 20–25 ml (¾ oz) citrus · 20 ml (¾ oz) syrup — the `2 : 0.75 : 0.75` sour spine
- **Technique:** shake hard with ice, strain · **Glass:** chilled coupe · **Garnish:** citrus wheel
- **Lesson:** acid. Shaking is required to aerate, chill and dilute juice in one move.
- **Branch:** Daiquiri, Whiskey Sour, Gimlet, Bee's Knees, Pisco Sour, Penicillin, Gin Basil Smash,
  Clover Club, Tommy's Margarita, Jungle Bird.
- **Substitutions:** citrus follows the spirit (§5.1); if the sweetener is thicker or more flavoured
  (honey, orgeat, raspberry), pull it back to 15–22 ml and taste.

### 2.4 Sidecar — spirit + citrus + liqueur as the sweetener
- **Formula:** 50 ml (1¾ oz) spirit · 20 ml (¾ oz) liqueur · 20 ml (¾ oz) citrus; equal-parts variants go 22 / 22 / 22 / 22
- **Technique:** shake, strain · **Glass:** chilled coupe, sometimes a sugar rim
- **Lesson:** the sweetener can also be a flavour. Liqueurs bring sugar *and* an opinion.
- **Branch:** Sidecar, Margarita, White Lady, Cosmopolitan, Last Word, Paper Plane, Naked & Famous,
  Corpse Reviver #2, Aviation, Mai Tai, Bramble.
- **Substitutions:** liqueurs vary hugely in sugar — Cointreau is drier than most triple secs,
  Chartreuse is herbal and 55 % ABV. Swapping the liqueur means re-tasting the acid.

### 2.5 Highball — spirit + carbonated mixer
- **Formula:** 45 ml (1½ oz) spirit · 135–180 ml (4½–6 oz) mixer — `1 : 3` to `1 : 4`
- **Technique:** build in the glass over ice, stir once or not at all · **Glass:** highball / collins
- **Lesson:** temperature and carbonation. Everything ice-cold, tall ice, minimal agitation, or you
  lose the bubbles that are the whole point.
- **Branch:** Whisky Highball, Gin Fizz, Tom Collins, Moscow Mule, Dark 'n' Stormy, Cuba Libre,
  Paloma, Spritz, Americano, French 75, Mojito.
- **Substitutions:** any spirit × any mixer, but match intensity — soda for delicate spirits,
  ginger beer and cola for assertive ones.

### 2.6 Flip — spirit + sweetener + egg or dairy
- **Formula:** 60 ml (2 oz) spirit or fortified wine · 15 ml (½ oz) rich syrup · 1 whole egg
- **Technique:** dry shake without ice to emulsify, then shake with ice, fine strain · **Glass:** small
  stemmed · **Garnish:** grated nutmeg
- **Lesson:** texture. Fat and protein round everything off and mute both sugar and alcohol.
- **Branch:** Brandy Flip, Porto Flip, Alexander, Grasshopper, Espresso Martini, Piña Colada,
  Ramos Gin Fizz, Irish Coffee.
- **Substitutions:** cream ↔ coconut cream ↔ egg. Avoid citrus with **dairy or yolk** unless the
  recipe is built for it — a Ramos works because the egg white, sugar and cream are balanced and it
  is shaken long enough to emulsify.

---

## 3. The three pairing mechanics

These are the three chord types drawn inside the app's circle.

### Complementary — same direction
Shared flavour compounds; the pairing deepens rather than contrasts.
Whiskey + vanilla / apple / maple · rum + tropical fruit and molasses · tequila + citrus and pepper ·
gin + herbs and cucumber · cognac + stone fruit · coffee + chocolate + hazelnut.

### Contrasting — opposite directions held in tension
The pleasure is in the gap: **sweet ↔ sour** (every sour), **sweet ↔ bitter** (Negroni),
**smoke ↔ sweet** (mezcal + pineapple, Islay + honey), **rich ↔ acid** (cream + coffee),
**hot ↔ cold**, **salt ↔ sweet** (the salted rim on a Margarita).

### Bridging — a third ingredient that makes two others get along
The most useful and least obvious mechanic:
- **Bitters** bridge spirit and sugar — without Angostura an Old Fashioned is just sweet whiskey.
- **Orange liqueur** bridges a spirit and citrus: Margarita, Sidecar, White Lady.
- **Maraschino** bridges gin and lime (Aviation, Last Word) — funky, nutty cherry sits between the
  juniper and the acid.
- **Absinthe**, as a rinse, bridges anise-friendly spirits and sugar (Sazerac, Remember the Maine).
- **Sherry** bridges almost anything with almost anything — it is nutty, saline and low-proof.
- **Egg white** bridges high acid and high proof by dulling both.

---

## 4. Ingredient reference

Ten families — the ten sectors of the wheel.

### 4.1 Brown spirits — *core, base notes, oak*
| Ingredient | Flavour | Pairs with, and why |
|---|---|---|
| Bourbon | corn sweetness, vanilla, caramel, oak | lemon, demerara, maple, sweet vermouth, Campari, Aperol, peach, cherry |
| Rye | dry, peppery, grassy, dill | sweet vermouth, Angostura, Peychaud's, absinthe, lemon, Bénédictine |
| Blended Scotch | malt, light smoke, honey, cereal | honey, ginger, lemon, Drambuie; an Islay float for smoke |
| Islay Scotch | peat, iodine, brine, smoke | honey, lemon, ginger — small amounts, as seasoning |
| Irish whiskey | soft, fruity, grain-forward | coffee, cream, sugar, sweet vermouth, green Chartreuse |
| Japanese whisky | precise, delicate, faintly smoky | soda water above all (the highball), citrus peel |
| Cognac | grape, stone fruit, dried fig, oak | Cointreau, lemon, port, crème de cacao, cream, Champagne |
| Calvados | apple, orchard funk | gin, apricot, lemon, sweet vermouth |
| Aged rum | molasses, banana, toffee, oak | lime, orgeat, curaçao, falernum, allspice, Angostura |
| Jamaican rum | high-ester funk, overripe banana | lime, cane syrup, Angostura, pineapple, Campari |
| Blackstrap rum | burnt molasses, liquorice, dark | pineapple, Campari, demerara, ginger beer, lime |
| Añejo tequila | cooked agave with vanilla and oak | orange liqueur, lime, agave, coffee, mole bitters |

### 4.2 White spirits — *core, top notes, bright*
| Ingredient | Flavour | Pairs with, and why |
|---|---|---|
| London dry gin | juniper, coriander, citrus peel, root spice | lemon, lime, dry vermouth, Campari, maraschino, Chartreuse, elderflower, mint, basil, cucumber, tonic |
| Old Tom gin | softer, lightly sweetened, malty | sweet vermouth, maraschino (a Martinez), lemon |
| Genever | malty, bready, botanical | lemon, sugar, bitters |
| Vodka | neutral canvas, texture only | anything that needs to be *itself*: espresso, coffee liqueur, cranberry, citrus, ginger beer, tomato |
| White rum | fresh cane, light grass | lime, sugar, mint, soda, pineapple, coconut |
| Rhum agricole | grassy, vegetal, saline | lime, cane syrup, and very little else |
| Blanco tequila | raw agave, pepper, citrus | lime, grapefruit, agave, orange liqueur, chili, salt |
| Mezcal | smoke, minerality, green agave | lime, pineapple, Aperol, yellow Chartreuse, grapefruit |
| Cachaça | fresh-pressed cane, funky, grassy | lime + sugar (Caipirinha), sweet vermouth, Cynar |
| Pisco | floral grape, muscat | lemon, simple syrup, egg white, Angostura, pineapple |
| Aquavit | caraway, dill, fennel | lemon, grapefruit, dry vermouth |
| Absinthe | anise, wormwood, fennel, 55–70 % | used as a **rinse or a dash**: rye, cognac, gin, sugar |

### 4.3 Fortified & aromatized wines — *balance, heart notes, low proof*
| Ingredient | Flavour | Pairs with, and why |
|---|---|---|
| Dry vermouth | pale, herbal, floral, saline | gin (the Martini), aquavit, blanco tequila, Campari |
| Sweet vermouth | red fruit, vanilla, spice, gentle bitterness | rye, bourbon, aged rum, cachaça, gin, Campari, Fernet |
| Bianco vermouth | vanilla and flowers, sweeter than dry | gin, blanco tequila, mezcal, grapefruit |
| Blanc aperitif (Lillet) | honeyed, faintly bitter, grapey | gin, vodka, lemon, Cointreau (Corpse Reviver #2) |
| Fino sherry | bone-dry, saline, almond | gin, tequila, citrus, soda |
| Amontillado sherry | nutty, dried fruit, oxidative | sugar and orange (a Cobbler), whiskey, rum |
| Ruby port | dark berry, sweet, grippy | brandy, egg yolk, nutmeg |
| Dry white wine | acidic, light | crème de cassis (Kir), pisco |
| Red wine | tannin, dark fruit | floated on a whiskey sour (New York Sour) |

### 4.4 Liqueurs — *sweetener with an opinion; the great bridges*
| Ingredient | Flavour | Pairs with, and why |
|---|---|---|
| Triple sec / Cointreau | clean bitter orange, dry for a liqueur | the universal bridge between spirit and citrus |
| Orange curaçao | richer, barrel-y orange | aged rum (Mai Tai), brandy, whiskey |
| Grand Marnier | cognac-based orange, heavier | tequila, brandy, Champagne |
| Maraschino | funky nutty cherry, dry finish | gin + lime, rum + grapefruit, whiskey |
| Green Chartreuse | 130 herbs, 55 %, sweet and savage | gin, lime, pineapple, Irish whiskey, mezcal |
| Yellow Chartreuse | gentler, honeyed, saffron | mezcal, Aperol, lime, gin |
| Bénédictine | honey, herbs, baking spice | rye, cognac, gin, sweet vermouth |
| Crème de cacao | chocolate, vanilla | cognac, cream, mint, coffee |
| Crème de menthe | sharp fresh mint | cacao, cream, brandy |
| Crème de cassis | blackcurrant, jammy | white wine, Champagne, vodka, lemon |
| Crème de mûre | blackberry | gin + lemon (Bramble) |
| Crème de violette | parma-violet floral | gin, maraschino, lemon (Aviation) — a little goes far |
| Cherry liqueur | ripe cherry, almond edge | rye, gin, pineapple, Bénédictine |
| Coffee liqueur | roast, molasses, sweet | vodka, espresso, cream, aged rum, tequila |
| Amaretto | marzipan, almond, sweet | cognac, bourbon, lemon |
| Drambuie | honeyed Scotch and herbs | Scotch, and essentially only Scotch (Rusty Nail) |
| Falernum | lime, clove, almond, ginger | rum, Chartreuse, pineapple, lime |
| Allspice dram | pimento, clove, warm spice | aged rum, honey, lime — dashes, not measures |
| Elderflower liqueur | muscat, floral, sweet | gin, lime, cucumber, Prosecco |
| Passion fruit liqueur | tart tropical | vodka, rum, lime, Prosecco |

### 4.5 Bitters & amari — *seasoning and bitterness*
| Ingredient | Flavour | Pairs with, and why |
|---|---|---|
| Angostura | clove, cinnamon, gentian | the bridge for any spirit + sugar; also tiki juice blends |
| Orange bitters | dried peel, cardamom | gin, rum, tequila, vermouth-driven drinks |
| Peychaud's | anise, cherry, lighter | rye and cognac (Sazerac, Vieux Carré) |
| Campari | bitter orange, rhubarb, gentian, 25 % | gin, bourbon, rum, sweet vermouth, orange, grapefruit, pineapple |
| Aperol | gentler, sweeter, rhubarb-orange | Prosecco, bourbon, mezcal, lemon |
| Fernet-Branca | menthol, saffron, bitter cane | cola, gin, sweet vermouth, mint — a dash reshapes a drink |
| Cynar | artichoke, earthy, caramel | cachaça, rum, sweet vermouth, grapefruit |
| Amaro Nonino | bitter orange, caramel, grappa base | bourbon, Aperol, lemon (Paper Plane) |

### 4.6 Citrus, acids & juices — *balance, top notes*
| Ingredient | Best with | Why |
|---|---|---|
| Lemon juice | whiskey, gin, cognac, pisco | clean, high-toned acidity that lifts barrel sweetness |
| Lime juice | rum, tequila, mezcal, cachaça, gin | aromatic acidity with tropical and agave affinity |
| Grapefruit juice | tequila, mezcal, gin, rum | its own bitterness meets the spirit halfway |
| Orange juice | tequila, gin, Campari, aged rum | sweet and low-acid — needs lemon or bitters alongside |
| Pineapple juice | rum, Campari, Chartreuse, mezcal | acid *and* sugar *and* foam when shaken |
| Cranberry juice | vodka, citrus vodka | tart colour and length, no real flavour of its own |
| Passion fruit purée | rum, vodka, Prosecco | intense tropical acid, already sweetened |

Always fresh, always same-day: citrus juice is bright for a few hours and dead the next morning.

### 4.7 Sweeteners — *balance and base notes*
| Ingredient | Flavour | Pairs with |
|---|---|---|
| Simple syrup (1:1) | neutral sugar | everything; the default |
| Demerara / rich syrup (2:1) | molasses, caramel, viscous | whiskey, aged rum, stirred drinks |
| Honey syrup (3:1 honey:water) | floral, waxy, heavy | Scotch, gin, rum, ginger, lemon |
| Agave nectar | vegetal sweetness | tequila, mezcal — reinforces the spirit's origin |
| Maple syrup | woody caramel | bourbon, rye, apple |
| Orgeat | almond, orange flower, creamy | aged rum, Angostura, lime, whiskey |
| Grenadine | pomegranate, tart-sweet | gin, tequila, rum, orange juice |
| Raspberry syrup | bright red fruit | gin, lemon, egg white |
| Ginger syrup | hot, fresh, spicy | Scotch, honey, lemon, rum |
| Cane syrup | raw sugar, grassy | rhum agricole, Jamaican rum, lime |
| Vanilla syrup | soft, round | vodka, rum, passion fruit |
| Sugar cube | sugar plus the ritual of muddling | Old Fashioned, Champagne Cocktail |

### 4.8 Fresh & aromatic — *seasoning, garnish, top notes*
Mint (rum, bourbon, gin, lime) · basil (gin, lemon) · ginger root (Scotch, rum, vodka, lime) ·
cucumber (gin, elderflower) · chili (tequila, vodka, lime) · espresso (vodka, coffee liqueur, rum) ·
nutmeg (anything with egg or cream) · orange-flower water (a Ramos; drops only) · salt (tequila,
grapefruit — suppresses bitterness and boosts aroma) · lemon and orange twists (the oil *is* an
ingredient) · maraschino cherry · olive (brine and salt in a Martini) · coffee beans.

**Garnish is not decoration.** An expressed orange peel over a Negroni changes the first three sips
more than the choice of gin does.

### 4.9 Fizz & lengtheners — *balance, length, carbonation*
Soda water (neutral length) · tonic (quinine bitterness — gin, blanco tequila) · ginger beer (hot and
sweet — vodka, dark rum, whiskey) · ginger ale (milder — brandy, bourbon) · cola (vanilla, caramel,
acid — rum, Fernet, whiskey) · grapefruit soda (tequila) · Champagne (acid, bubbles and prestige —
gin, cognac, cassis, peach) · Prosecco (softer, cheaper, spritz-ready) · hot coffee (Irish whiskey,
sugar, cream).

Keep mixers refrigerated and freshly opened; carbonation is the ingredient you are actually buying.

### 4.10 Rich — *texture, base notes*
Egg white (foam and body in sours; no flavour) · whole egg (a flip's richness) · egg yolk (custard
weight — keep away from citrus) · heavy cream (cognac, cacao, coffee, mint) · coconut cream (rum,
pineapple) · whole milk (punches, clarification).

---

## 5. Affinity tables

The edge data of the wheel, in plain table form. `●●●` = canonical, `●●` = strong, `●` = works.

### 5.1 Citrus × spirit
| | Bourbon / Rye | Scotch | Cognac | Gin | Vodka | White rum | Aged rum | Tequila | Mezcal | Pisco | Cachaça |
|---|---|---|---|---|---|---|---|---|---|---|---|
| **Lemon** | ●●● | ●●● | ●●● | ●●● | ●● | ● | ●● | ● | ● | ●●● | ● |
| **Lime** | ● | ● | ● | ●●● | ●● | ●●● | ●●● | ●●● | ●●● | ● | ●●● |
| **Grapefruit** | ● | ● | ● | ●● | ● | ●● | ●● | ●●● | ●●● | ● | ● |
| **Orange** | ●● | ● | ●● | ●● | ●● | ● | ●● | ●●● | ●● | ● | ● |
| **Pineapple** | ● | ● | ● | ●● | ● | ●●● | ●●● | ● | ●● | ●● | ● |

### 5.2 Sweetener × spirit
| Sweetener | Goes with | Canonical drink |
|---|---|---|
| Demerara / rich | bourbon, rye, aged rum, blackstrap | Old Fashioned, Jungle Bird |
| Maple | bourbon, rye, calvados | Maple Old Fashioned |
| Honey | Scotch, gin, white rum, aquavit | Bee's Knees, Penicillin |
| Agave | blanco tequila, mezcal | Tommy's Margarita |
| Orgeat | aged rum, rye, brandy | Mai Tai, Trinidad Sour |
| Grenadine | gin, tequila, rum | Monkey Gland, Tequila Sunrise |
| Raspberry | gin, vodka | Clover Club |
| Ginger | Scotch, rum, vodka | Penicillin, Moscow Mule |
| Cane | rhum agricole, Jamaican rum | Ti' Punch, Planter's Punch |
| Simple | everything | Daiquiri, Gimlet |

### 5.3 Fortified wine × spirit
| | Dry vermouth | Sweet vermouth | Bianco | Blanc aperitif | Fino | Amontillado | Port |
|---|---|---|---|---|---|---|---|
| **Gin** | ●●● | ●● | ●● | ●●● | ●● | ● | — |
| **Rye / bourbon** | ● | ●●● | ● | ● | ● | ●● | ● |
| **Cognac** | ● | ●●● | ● | ● | ● | ●● | ●●● |
| **Aged rum** | ● | ●● | ● | ● | ● | ●● | ● |
| **Tequila / mezcal** | ●● | ●● | ●●● | ●● | ●● | ● | — |
| **Vodka** | ●● | ● | ● | ●●● | ● | ● | — |

### 5.4 Bitters & amari × spirit
| | Bourbon / Rye | Scotch | Cognac | Gin | Rum | Tequila | Mezcal | Vodka |
|---|---|---|---|---|---|---|---|---|
| **Angostura** | ●●● | ●● | ●●● | ●● | ●●● | ●● | ●● | ● |
| **Orange bitters** | ●● | ● | ●● | ●●● | ●●● | ●● | ●● | ● |
| **Peychaud's** | ●●● | ● | ●●● | ● | ●● | ● | ● | ● |
| **Campari** | ●●● | ● | ●● | ●●● | ●●● | ●● | ●● | ● |
| **Aperol** | ●●● | ● | ● | ●● | ●● | ●● | ●●● | ● |
| **Fernet** | ●● | ● | ● | ●●● | ●● | ● | ● | ● |
| **Cynar** | ●● | ● | ● | ●● | ●●● | ● | ●● | ● |
| **Amaro Nonino** | ●●● | ●● | ●● | ● | ●● | ● | ●● | ● |

### 5.5 What does not work, and why
- **Citrus + cream or egg yolk** — the acid curdles the dairy. The exceptions (Ramos Gin Fizz) work
  only through long emulsifying shakes and a lot of sugar.
- **Two loud amari together** — Fernet plus Campari cancel into generic bitterness. Use one as core
  and one as a dash, or drop one.
- **Juice in a stirred spirit-forward drink** — juice needs the aeration and dilution of a shake;
  stirred, it tastes heavy and separates in the glass.
- **Bubbles in a shaker** — never. Build carbonated drinks in the glass.
- **Sugar and a sweet liqueur with no acid** — cloying. Add citrus or bitterness, or cut the syrup.
- **A delicate spirit under a loud mixer** — a fine añejo tequila under cola is money on fire.
- **Peat, floral and chocolate all at once** — three base-note personalities, no room to breathe.

---

## 6. Technique & balance

- **Shake** anything with juice, egg, dairy or purée: about 12 seconds, hard, with fresh cold ice.
  It chills, dilutes and aerates at once.
- **Stir** anything entirely alcoholic: about 30 seconds, until the outside of the glass frosts.
  Clarity and a silkier texture, less dilution.
- **Build** highballs directly in the glass — cold ingredients, tall ice, one gentle lift.
- **Dry shake** egg drinks without ice first to emulsify, then shake again with ice.
- **Muddle** herbs by pressing, not tearing — bruised mint goes bitter and grassy.
- **Dilution is an ingredient.** A stirred drink gains roughly 20 % water, a shaken one 25 %.
  Under-diluted cocktails taste hot and closed; over-diluted ones taste of nothing.
- **Ice:** big and cold for stirring and rocks, fresh for shaking, crushed for juleps and swizzles.
- **Taste and adjust.** The `2 : 0.75 : 0.75` spine is a starting point. Sweeter citrus (a ripe lime,
  a Meyer lemon) means less syrup; a thick or flavoured sweetener means less of it.
- **Chill the glass.** A warm coupe undoes 30 seconds of stirring in 30 seconds of drinking.

---

## 7. Glassware & garnish

| Glass | Volume | Use | Typical garnish |
|---|---|---|---|
| Rocks / old fashioned | 200–300 ml | spirit-forward on ice | expressed citrus peel |
| Coupe / cocktail | 150–200 ml | shaken or stirred, no ice | twist, cherry, olive |
| Highball / collins | 300–400 ml | spirit + mixer over ice | long peel, lime wedge, mint |
| Copper mug | 350 ml | mules | lime wedge, mint |
| Flute | 150–200 ml | sparkling | lemon twist, berry |
| Tiki / hurricane | 400 ml+ | crushed-ice rum drinks | mint, spent lime shell |
| Julep cup | 300 ml | crushed ice | mint bouquet |
| Nick & Nora | 150 ml | stirred, elegant | twist |
| Irish coffee mug | 200 ml | hot drinks | nutmeg, cream float |

Express a peel by squeezing it skin-down over the surface, then rub the rim. Mint should be slapped,
not muddled, when it is a garnish.

---

## 8. Substitution & improvisation rules

1. **Stay in the family.** Swap a spirit for another aged spirit, a liqueur for another liqueur of
   similar sugar, a citrus for another citrus of similar acidity.
2. **Follow the sweetener to the spirit's origin** — cane to rum, agave to tequila, demerara to
   whiskey, honey to Scotch.
3. **Swap acids by strength**, not by name: lime and lemon are close (about 6 % acid), grapefruit and
   orange are much weaker and need lemon or lime alongside to hold a sour together.
4. **Every liqueur swap is also a sugar swap.** Going from Cointreau to a cheap triple sec adds
   sugar; pull the syrup or add 5 ml of citrus.
5. **Bitters are interchangeable in kind, not in quantity.** Peychaud's is lighter than Angostura, so
   use a dash or two more.
6. **Out of vermouth?** A blanc aperitif or a fino sherry can stand in for dry vermouth; for sweet
   vermouth, amontillado plus a dash of syrup gets you close.
7. **No egg?** 10 ml of aquafaba, or a rich syrup, buys some of the texture back.
8. **Change one thing at a time** — and write down what you did.

---

## 9. The recipes

67 drinks, grouped by root family, written `ml (oz)`. Techniques: **stir**, **shake**, **build**,
**dry shake**, **swizzle**.

### Old Fashioned family
| Drink | Build | Technique · Glass · Garnish |
|---|---|---|
| Old Fashioned | bourbon 60 (2) · demerara syrup 7.5 (¼) · Angostura 3 dashes | stir · rocks · orange peel |
| Sazerac | rye 60 (2) · simple syrup 7.5 (¼) · Peychaud's 4 dashes · absinthe rinse | stir · rocks, no ice · lemon peel |
| Mint Julep | bourbon 60 (2) · simple syrup 15 (½) · 8 mint leaves | swizzle · julep cup, crushed ice · mint bouquet |
| Caipirinha | cachaça 60 (2) · half a lime in wedges · caster sugar 2 tsp | muddle & build · rocks · lime |
| Champagne Cocktail | Champagne 100 (3⅓) · 1 sugar cube · Angostura 2 dashes · cognac 5 (⅙) | build · flute · lemon twist |
| Rusty Nail | blended Scotch 45 (1½) · Drambuie 25 (¾) | stir · rocks · lemon peel |
| Black Russian | vodka 50 (1¾) · coffee liqueur 20 (¾) | build · rocks · — |
| Stinger | cognac 50 (1¾) · white crème de menthe 20 (¾) | stir · coupe · mint |

### Martini family
| Drink | Build | Technique · Glass · Garnish |
|---|---|---|
| Dry Martini | gin 60 (2) · dry vermouth 10 (⅓) | stir · coupe · olive or lemon twist |
| Manhattan | rye 60 (2) · sweet vermouth 30 (1) · Angostura 2 dashes | stir · coupe · cherry |
| Negroni | gin 30 (1) · Campari 30 (1) · sweet vermouth 30 (1) | stir · rocks · orange peel |
| Boulevardier | bourbon 45 (1½) · Campari 30 (1) · sweet vermouth 30 (1) | stir · rocks · orange peel |
| Martinez | gin 45 (1½) · sweet vermouth 45 (1½) · maraschino 5 (⅙) · orange bitters 2 dashes | stir · coupe · lemon twist |
| Vieux Carré | rye 30 (1) · cognac 30 (1) · sweet vermouth 30 (1) · Bénédictine 5 (⅙) · Peychaud's and Angostura, 1 dash each | stir · rocks · lemon twist |
| Hanky Panky | gin 45 (1½) · sweet vermouth 45 (1½) · Fernet-Branca 7.5 (¼) | stir · coupe · orange peel |
| Vesper | gin 60 (2) · vodka 20 (¾) · blanc aperitif 10 (⅓) | stir · coupe · lemon twist |
| Cardinale | gin 45 (1½) · dry vermouth 20 (¾) · Campari 20 (¾) | stir · coupe · orange peel |
| Tipperary | Irish whiskey 45 (1½) · sweet vermouth 22 (¾) · green Chartreuse 15 (½) · Angostura 1 dash | stir · coupe · orange peel |
| Remember the Maine | rye 60 (2) · sweet vermouth 20 (¾) · cherry liqueur 10 (⅓) · absinthe rinse | stir · coupe · cherry |
| Kir | dry white wine 90 (3) · crème de cassis 10 (⅓) | build · wine glass · — |

### Daiquiri family
| Drink | Build | Technique · Glass · Garnish |
|---|---|---|
| Daiquiri | white rum 60 (2) · lime 25 (¾) · simple syrup 20 (¾) | shake · coupe · lime wheel |
| Whiskey Sour | bourbon 60 (2) · lemon 25 (¾) · simple syrup 20 (¾) · egg white (optional) | shake · rocks · lemon, cherry |
| Gimlet | gin 60 (2) · lime 25 (¾) · simple syrup 20 (¾) | shake · coupe · lime wheel |
| Pisco Sour | pisco 60 (2) · lemon 30 (1) · simple syrup 20 (¾) · egg white · Angostura 3 drops | dry shake · coupe · bitters |
| Bee's Knees | gin 60 (2) · lemon 22 (¾) · honey syrup 22 (¾) | shake · coupe · lemon twist |
| Gin Basil Smash | gin 60 (2) · lemon 25 (¾) · simple syrup 20 (¾) · 10 basil leaves | shake · rocks · basil top |
| South Side | gin 60 (2) · lemon 22 (¾) · simple syrup 20 (¾) · 8 mint leaves | shake · coupe · mint |
| Penicillin | blended Scotch 60 (2) · lemon 22 (¾) · honey-ginger syrup 22 (¾) · Islay Scotch 7.5 float (¼) | shake · rocks · candied ginger |
| Clover Club | gin 50 (1¾) · lemon 20 (¾) · raspberry syrup 15 (½) · egg white | dry shake · coupe · raspberry |
| New York Sour | rye 60 (2) · lemon 25 (¾) · simple syrup 20 (¾) · red wine 15 float (½) | shake · rocks · — |
| Tommy's Margarita | blanco tequila 60 (2) · lime 25 (¾) · agave nectar 15 (½) | shake · rocks · lime |
| Hemingway Special | white rum 60 (2) · grapefruit 40 (1⅓) · lime 15 (½) · maraschino 15 (½) | shake · coupe · lime |
| Jungle Bird | blackstrap rum 45 (1½) · Campari 22 (¾) · pineapple 45 (1½) · lime 15 (½) · demerara syrup 15 (½) | shake · rocks · pineapple |
| Trinidad Sour | Angostura 30 (1) · orgeat 30 (1) · lemon 22 (¾) · rye 15 (½) | shake · coupe · — |
| Planter's Punch | Jamaican rum 60 (2) · lime 25 (¾) · cane syrup 20 (¾) · Angostura 3 dashes · a splash of soda | shake · highball · orange, cherry |

### Sidecar family
| Drink | Build | Technique · Glass · Garnish |
|---|---|---|
| Sidecar | cognac 50 (1¾) · Cointreau 20 (¾) · lemon 20 (¾) | shake · coupe · sugar rim |
| Margarita | blanco tequila 50 (1¾) · Cointreau 20 (¾) · lime 20 (¾) | shake · coupe · salt rim, lime |
| White Lady | gin 40 (1⅓) · triple sec 30 (1) · lemon 20 (¾) | shake · coupe · lemon twist |
| Between the Sheets | white rum 30 (1) · cognac 30 (1) · triple sec 20 (¾) · lemon 20 (¾) | shake · coupe · lemon twist |
| Cosmopolitan | citrus vodka 45 (1½) · Cointreau 15 (½) · lime 15 (½) · cranberry 30 (1) | shake · coupe · orange peel |
| Last Word | gin 22 (¾) · green Chartreuse 22 (¾) · maraschino 22 (¾) · lime 22 (¾) | shake · coupe · cherry |
| Paper Plane | bourbon 22 (¾) · Aperol 22 (¾) · Amaro Nonino 22 (¾) · lemon 22 (¾) | shake · coupe · — |
| Naked & Famous | mezcal 22 (¾) · yellow Chartreuse 22 (¾) · Aperol 22 (¾) · lime 22 (¾) | shake · coupe · — |
| Corpse Reviver #2 | gin 22 (¾) · Cointreau 22 (¾) · blanc aperitif 22 (¾) · lemon 22 (¾) · absinthe rinse | shake · coupe · orange peel |
| Aviation | gin 45 (1½) · maraschino 15 (½) · crème de violette 7.5 (¼) · lemon 15 (½) | shake · coupe · cherry |
| Bramble | gin 50 (1¾) · lemon 25 (¾) · simple syrup 12.5 (⅖) · crème de mûre 15 (½) | shake, then drizzle · rocks, crushed ice · blackberry, lemon |
| Mai Tai | aged rum 60 (2) · orange curaçao 15 (½) · orgeat 15 (½) · lime 22 (¾) | shake · rocks, crushed ice · mint, spent lime shell |
| Casino | gin 45 (1½) · maraschino 15 (½) · lemon 15 (½) · orange bitters 2 dashes | shake · coupe · cherry |
| Chartreuse Swizzle | green Chartreuse 45 (1½) · pineapple 30 (1) · lime 22 (¾) · falernum 15 (½) | swizzle · highball, crushed ice · mint, nutmeg |
| Three Dots and a Dash | aged rum 45 (1½) · falernum 15 (½) · allspice dram 7.5 (¼) · honey syrup 15 (½) · lime 15 (½) · orange 15 (½) · Angostura 2 dashes | shake · tiki · mint, cherries |

### Highball family
| Drink | Build | Technique · Glass · Garnish |
|---|---|---|
| Whisky Highball | Japanese whisky 45 (1½) · soda water 135 (4½) | build · highball · lemon peel |
| Gin Fizz | gin 45 (1½) · lemon 25 (¾) · simple syrup 20 (¾) · soda water 60 (2) | shake, then top · highball · lemon |
| Tom Collins | gin 45 (1½) · lemon 30 (1) · simple syrup 15 (½) · soda water 60 (2) | build · collins · lemon, cherry |
| French 75 | gin 30 (1) · lemon 15 (½) · simple syrup 10 (⅓) · Champagne 60 (2) | shake, then top · flute · lemon twist |
| Mojito | white rum 60 (2) · lime 22 (¾) · simple syrup 15 (½) · 8 mint leaves · soda water 60 (2) | build · highball · mint |
| Dark 'n' Stormy | blackstrap rum 60 (2) · ginger beer 100 (3⅓) · lime 15 (½) | build, float the rum · highball · lime |
| Moscow Mule | vodka 45 (1½) · lime 15 (½) · ginger beer 120 (4) | build · copper mug · lime, mint |
| Cuba Libre | white rum 50 (1¾) · lime 10 (⅓) · cola 120 (4) | build · highball · lime |
| Paloma | blanco tequila 50 (1¾) · lime 15 (½) · grapefruit soda 100 (3⅓) · a pinch of salt | build · highball · grapefruit |
| Spritz | Prosecco 90 (3) · Aperol 60 (2) · soda water 30 (1) | build · wine glass · orange slice |
| Americano | Campari 30 (1) · sweet vermouth 30 (1) · soda water 90 (3) | build · highball · orange, lemon |
| Garibaldi | Campari 50 (1¾) · fluffy orange juice 100 (3⅓) | build · highball · orange |
| Horse's Neck | cognac 50 (1¾) · ginger ale 120 (4) · Angostura 2 dashes | build · highball · long lemon peel |
| Sherry Cobbler | amontillado sherry 90 (3) · simple syrup 15 (½) · 2 orange wheels | shake · highball, crushed ice · orange, berries |

### Flip & rich family
| Drink | Build | Technique · Glass · Garnish |
|---|---|---|
| Brandy Flip | cognac 60 (2) · rich syrup 15 (½) · 1 whole egg | dry shake · coupe · nutmeg |
| Porto Flip | ruby port 45 (1½) · cognac 15 (½) · rich syrup 10 (⅓) · 1 egg yolk | dry shake · coupe · nutmeg |
| Alexander | cognac 30 (1) · crème de cacao 30 (1) · heavy cream 30 (1) | shake · coupe · nutmeg |
| Grasshopper | green crème de menthe 30 (1) · white crème de cacao 30 (1) · heavy cream 30 (1) | shake · coupe · mint |
| Espresso Martini | vodka 50 (1¾) · coffee liqueur 20 (¾) · espresso 30 (1) · simple syrup 10 (⅓) | shake · coupe · 3 coffee beans |
| White Russian | vodka 50 (1¾) · coffee liqueur 20 (¾) · heavy cream 30 (1) | build, float the cream · rocks · — |
| Piña Colada | white rum 50 (1¾) · coconut cream 30 (1) · pineapple 50 (1¾) | blend or shake · hurricane · pineapple |
| Ramos Gin Fizz | gin 45 (1½) · lemon 15 (½) · lime 15 (½) · simple syrup 20 (¾) · heavy cream 30 (1) · egg white · orange-flower water 3 drops · soda water 30 (1) | dry shake, long shake, then top · highball · — |
| Irish Coffee | Irish whiskey 40 (1⅓) · hot coffee 90 (3) · demerara syrup 10 (⅓) · lightly whipped cream float | build · Irish coffee mug · nutmeg |

---

## 10. Sources

- [List of IBA official cocktails — Wikipedia](https://en.wikipedia.org/wiki/List_of_IBA_official_cocktails)
- [IBA — all official cocktails](https://iba-world.com/cocktails/all-cocktails/)
- [The Cocktail Flavor Matrix — Liquor Librarian](https://www.liquorlibrarian.com/post/the-cocktail-flavor-matrix-a-bartender-s-guide-to-pairing-spirits-modifiers-and-aromatics)
- [The 6 Cocktail Families: root recipes and formulas — The Double Strainer](https://www.thedoublestrainer.com/post/the-6-main-cocktail-families-root-recipes-formulas-and-how-to-build-any-drink)
- [Mastering Cocktail Flavor Pairing: Building Cocktails Like a Perfumer — Felene](https://felenevodka.com/mastering-cocktail-flavor-pairing-building-cocktails-like-a-perfumer/)
- [The Complete Cocktail Flavor Pairing Chart — Felene](https://felenevodka.com/the-complete-cocktail-flavor-pairing-chart/)
- [A Guide to Flavor Pairings and Recipe Development — Hawaii Beverage Guide](https://www.hawaiibevguide.com/flavor-pairings-and-recipe-development.html)
- [Cocktail Codex: Fundamentals, Formulas, Evolutions — Death & Co (framework reference)](https://www.penguinrandomhouseretail.com/book/?isbn=9781607749707)
- [Cocktail families and categories — Cocktailways](https://cocktailways.com/cocktail-families/)

*Drink responsibly. The volumes here are bar standards for building a drink, not advice about how
much to drink.*
