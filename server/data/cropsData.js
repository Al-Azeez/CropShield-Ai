export const CROPS_DATA = [
  {
    id: "tomato",
    name: "Tomato",
    scientificName: "Solanum lycopersicum",
    category: "Solanaceae / Nightshade",
    icon: "🍅",
    description: "One of the most widely grown vegetable crops worldwide, susceptible to fungal blights, viral mosaics, and bacterial spots.",
    diseases: [
      {
        id: "tomato-early-blight",
        name: "Early Blight",
        pathogen: "Alternaria solani (Fungus)",
        status: "Diseased",
        severity: "Moderate",
        defaultConfidence: 94,
        description: "A common fungal disease causing concentric target-like brown spots on older lower leaves, eventually causing severe defoliation and fruit drop.",
        symptoms: [
          "Brown circular lesions with concentric ring patterns (bullseye target)",
          "Chlorosis (yellow halo) surrounding dark necrotic spots",
          "Lower canopy leaf drop and stem lesions near soil level",
          "Dark sunken leathery spots on fruit stem ends"
        ],
        causes: [
          "Prolonged leaf wetness and high humidity (>80%)",
          "Warm temperatures between 24°C - 29°C (75°F - 85°F)",
          "Overhead sprinkler irrigation splashing soil spores onto lower leaves",
          "Dense plant spacing restricting canopy airflow"
        ],
        explainableAI: {
          primaryReason: "Concentric target-like ring lesions and chlorotic halos detected on foliage with 94% visual pattern match to Alternaria solani.",
          features: [
            { name: "Concentric Ring Lesions", importance: 92, detected: true, note: "Target-board circular necrosis characteristic of Alternaria" },
            { name: "Chlorotic Margin Halo", importance: 88, detected: true, note: "Yellow zone indicating toxin diffusion around necrotic tissue" },
            { name: "Lower Canopy Distribution", importance: 84, detected: true, note: "Older leaf colonization pattern consistent with early blight" },
            { name: "Stem Canker Detection", importance: 68, detected: false, note: "Stem tissue currently unaffected" }
          ],
          boundingZones: [
            { x: 28, y: 35, width: 24, height: 26, label: "Bullseye Target Lesion (96% conf)" },
            { x: 58, y: 48, width: 20, height: 22, label: "Chlorotic Halo Zone (91% conf)" },
            { x: 38, y: 65, width: 22, height: 18, label: "Necrotic Margin (89% conf)" }
          ],
          differentialDiagnoses: [
            { disease: "Early Blight (Alternaria solani)", probability: 94 },
            { disease: "Septoria Leaf Spot", probability: 4 },
            { disease: "Bacterial Spot", probability: 2 }
          ]
        },
        actionPlan: {
          immediate: [
            "Prune off heavily infected lower leaves using sanitized shears and dispose of them away from the field (do NOT compost).",
            "Disinfect pruning tools between cuts with 70% isopropyl alcohol or 10% bleach solution."
          ],
          treatment: [
            "Organic Option: Spray Liquid Copper Fungicide or Bacillus subtilis (Serenade) every 7-10 days.",
            "Chemical Option: Apply Chlorothalonil or Mancozeb protective spray as per label directions.",
            "Apply early in the morning so foliage dries quickly in the sun."
          ],
          whatToAvoid: [
            "Avoid overhead sprinkler irrigation; always use drip or soaker hoses.",
            "Do NOT work or prune in tomato fields while leaves are wet.",
            "Avoid excessive high-nitrogen fertilizers that produce overly dense, soft vegetative growth."
          ],
          monitoring: [
            "Scout adjacent rows within a 10-meter radius every 48 hours for new spots.",
            "Inspect underside of lower leaves daily for early lesion onset."
          ],
          followUp: [
            "Take a follow-up scan in 4 to 5 days to confirm lesion stabilization.",
            "Apply fresh straw mulch (5-7 cm) under plants to prevent soil splash."
          ]
        },
        prevention: [
          "Practice 3-year crop rotation avoiding other Solanaceae (potatoes, peppers, eggplants).",
          "Ensure wide plant spacing (60-90 cm) and stake or cage tomatoes for maximum air circulation.",
          "Use certified disease-free seeds and blight-resistant cultivars (e.g., Defiant, Mountain Merit).",
          "Apply organic straw or plastic mulch immediately after transplanting."
        ]
      },
      {
        id: "tomato-late-blight",
        name: "Late Blight",
        pathogen: "Phytophthora infestans (Oomycete)",
        status: "Diseased",
        severity: "High",
        defaultConfidence: 96,
        description: "A catastrophic water-mold disease that spreads with explosive speed in cool, wet weather, destroying entire crops in days.",
        symptoms: [
          "Large, irregular water-soaked pale green or dark brown lesions",
          "Delicate white cottony/fuzzy fungal growth visible on leaf undersides in high humidity",
          "Rapid browning, wilting, and collapse of foliage",
          "Greasy, firm, dark brown rot on green and ripe tomato fruits"
        ],
        causes: [
          "Cool, moist weather (15°C - 22°C / 60°F - 72°F) with relative humidity >90%",
          "Wind-borne sporangia travelling over miles from infected potato or tomato fields",
          "Prolonged leaf wetness from continuous rain, fog, or dew"
        ],
        explainableAI: {
          primaryReason: "Rapid-spreading water-soaked greasy lesions with underside sporulation signatures matching Phytophthora infestans.",
          features: [
            { name: "Water-Soaked Lesions", importance: 97, detected: true, note: "Fast-expanding irregular necrotic zones" },
            { name: "Underside Sporulation", importance: 94, detected: true, note: "White mildew-like mycelial fringe on abaxial surface" },
            { name: "Fruit Rot Signatures", importance: 82, detected: true, note: "Firm brown sub-epidermal decay detected" }
          ],
          boundingZones: [
            { x: 30, y: 25, width: 38, height: 35, label: "Expanding Water-Soaked Blight (98% conf)" },
            { x: 45, y: 55, width: 30, height: 30, label: "Underside Sporangia Zone (95% conf)" }
          ],
          differentialDiagnoses: [
            { disease: "Late Blight (Phytophthora infestans)", probability: 96 },
            { disease: "Early Blight", probability: 3 },
            { disease: "Gray Mold (Botrytis)", probability: 1 }
          ]
        },
        actionPlan: {
          immediate: [
            "URGENT: Immediately bag and remove severely infected plants in sealed trash bags to stop billions of windblown spores.",
            "Do not drag infected vines across healthy rows."
          ],
          treatment: [
            "Apply targeted systemic fungicides such as Cymoxanil, Dimethomorph, or Mandipropamid immediately.",
            "Organic: Fixed Copper hydroxide sprays can protect uninfected surrounding vines."
          ],
          whatToAvoid: [
            "Never leave cull piles of diseased tomatoes or potatoes near fields.",
            "Do not irrigate during overcast or humid weather."
          ],
          monitoring: [
            "Check the entire field twice daily. Late blight can destroy a crop in 48-72 hours under cool wet conditions."
          ],
          followUp: [
            "Re-inspect in 48 hours. Report localized outbreak to regional agricultural extension."
          ]
        },
        prevention: [
          "Plant resistant cultivars (such as Mountain Magic, Plum Regal, Legend).",
          "Destroy volunteer tomato and potato plants in spring.",
          "Maintain maximum aeration and sun exposure in rows."
        ]
      },
      {
        id: "tomato-yellow-leaf-curl",
        name: "Tomato Yellow Leaf Curl Virus (TYLCV)",
        pathogen: "Begomovirus (Transmitted by Whitefly Bemisia tabaci)",
        status: "Diseased",
        severity: "High",
        defaultConfidence: 91,
        description: "A devastating viral disease characterized by severe stunting, upward leaf curling, yellow margins, and flower drop.",
        symptoms: [
          "Severe upward cupping and curling of young leaflets",
          "Interveinal yellowing (chlorosis) and reduced leaf lamina size",
          "Bushy, stunted plant architecture",
          "Heavy blossom drop resulting in little or no fruit set"
        ],
        causes: [
          "Infestation by sweetpotato whitefly (Bemisia tabaci)",
          "Planting susceptible varieties in warm subtropical climates",
          "Presence of weed reservoirs harboring Begomovirus"
        ],
        explainableAI: {
          primaryReason: "Upward leaf rolling, reduced blade surface, and apical interveinal chlorosis signature typical of TYLCV viral infection.",
          features: [
            { name: "Upward Leaf Cupping", importance: 95, detected: true, note: "Distinctive spoon-like upward curvature" },
            { name: "Apical Chlorosis", importance: 90, detected: true, note: "Pronounced margin and interveinal yellowing" },
            { name: "Internode Shortening", importance: 86, detected: true, note: "Stunted growth and rosette appearance" }
          ],
          boundingZones: [
            { x: 35, y: 20, width: 35, height: 40, label: "Upward Curled Chlorotic Cluster (93% conf)" }
          ],
          differentialDiagnoses: [
            { disease: "Tomato Yellow Leaf Curl Virus", probability: 91 },
            { disease: "Tomato Mosaic Virus", probability: 6 },
            { disease: "Herbicide Drift Damage", probability: 3 }
          ]
        },
        actionPlan: {
          immediate: [
            "Rogue and destroy infected plants immediately—viruses cannot be cured once inside the vascular system.",
            "Install yellow sticky traps (1 trap per 20 m²) to trap whitefly vectors."
          ],
          treatment: [
            "Control whitefly vectors using Insecticidal Soap, Neem Oil, or Pyriproxyfen insect growth regulator.",
            "Spray early morning under the leaves where whiteflies congregate."
          ],
          whatToAvoid: [
            "Do not spray standard contact insecticides that harm beneficial predatory mites and lacewings."
          ],
          monitoring: [
            "Inspect underside of new growth for tiny whiteflies and nymphs using a 10x hand lens."
          ],
          followUp: [
            "Check whitefly population levels on traps every 3 days."
          ]
        },
        prevention: [
          "Use TYLCV-resistant hybrid tomato varieties (e.g., Tycoon, Grand Marshall, Red Snapper).",
          "Use fine 50-mesh insect netting in greenhouses/nurseries.",
          "Maintain reflective silver mulches to repel incoming whitefly swarms."
        ]
      },
      {
        id: "tomato-healthy",
        name: "Healthy Tomato Foliage",
        pathogen: "None (Optimal Physiological State)",
        status: "Healthy",
        severity: "Low",
        defaultConfidence: 98,
        description: "Vibrant deep green foliage with uniform chlorophyll distribution, intact leaf margins, vigorous turgor pressure, and no visible lesions or pests.",
        symptoms: [
          "Uniform dark emerald green color across leaf surface",
          "Serrated margins are clean without browning or necrotic edging",
          "Strong vascular turgor and normal leaf expansion",
          "Clean leaf underside free of fungal mycelium or insect clusters"
        ],
        causes: [
          "Balanced N-P-K nutrient uptake and adequate micronutrients (Fe, Mg, Ca)",
          "Optimal soil moisture (consistent 60-70% field capacity)",
          "Proper sunlight exposure (6-8 hours daily) and good canopy airflow"
        ],
        explainableAI: {
          primaryReason: "High normalized vegetative index (NDVI), uniform chlorophyll pigment density, and absence of necrotic or chlorotic aberrations.",
          features: [
            { name: "Chlorophyll Homogeneity", importance: 99, detected: true, note: "Even green pigment without mosaic or spotting" },
            { name: "Cellular Turgidity", importance: 97, detected: true, note: "Well-hydrated cellular structure" },
            { name: "Absence of Pathogen Signatures", importance: 98, detected: true, note: "No fungal spores, bacterial spots or viral cupping detected" }
          ],
          boundingZones: [
            { x: 20, y: 20, width: 60, height: 60, label: "Healthy Leaf Lamina (99% conf)" }
          ],
          differentialDiagnoses: [
            { disease: "Healthy Tomato", probability: 98 },
            { disease: "Sub-clinical Nutrient Stress", probability: 2 }
          ]
        },
        actionPlan: {
          immediate: [
            "Maintain current watering and fertigation routine; the plant is in excellent health.",
            "Record this scan in your field journal as a baseline for future comparisons."
          ],
          treatment: [
            "No chemical or corrective treatment needed.",
            "Continue prophylactic organic bio-stimulant foliar spray (Seaweed extract / Fulvic acid)."
          ],
          whatToAvoid: [
            "Avoid over-fertilizing with high nitrogen which could attract aphids."
          ],
          monitoring: [
            "Routine weekly scouting for early season pests (aphids, hornworms, thrips)."
          ],
          followUp: [
            "Perform another regular health scan in 7-10 days."
          ]
        },
        prevention: [
          "Continue drip irrigation and mulch maintenance.",
          "Ensure steady calcium availability to prevent future blossom end rot."
        ]
      }
    ]
  },
  {
    id: "potato",
    name: "Potato",
    scientificName: "Solanum tuberosum",
    category: "Solanaceae / Tuber",
    icon: "🥔",
    description: "A global staple tuber crop highly vulnerable to Late Blight, Early Blight, Potato Virus Y (PVY), and Blackleg.",
    diseases: [
      {
        id: "potato-late-blight",
        name: "Potato Late Blight",
        pathogen: "Phytophthora infestans",
        status: "Diseased",
        severity: "High",
        defaultConfidence: 95,
        description: "The historical cause of the Irish Potato Famine. Produces rapid water-soaked dark leaf necrosis and destroys tuber quality with brown dry rot.",
        symptoms: [
          "Irregular dark brown to purplish-black water-soaked lesions on leaves",
          "White fluffy downy mildew on leaf undersides in humid conditions",
          "Blackened decaying stems collapsing under plant weight",
          "Granular rusty-brown dry rot beneath tuber skin"
        ],
        causes: [
          "Persistent wet canopy with temperatures between 10°C - 20°C (50°F - 68°F)",
          "Infected seed tubers planted in the current season",
          "High humidity or heavy overnight dew condensation"
        ],
        explainableAI: {
          primaryReason: "Characteristic water-soaked irregular necrosis expanding from leaf tips and margins with underside sporulation signatures.",
          features: [
            { name: "Apical Necrosis", importance: 96, detected: true, note: "Expanding dark lesions with pale water-soaked halo" },
            { name: "Mycelial Sporulation", importance: 92, detected: true, note: "Microscopic white sporangiophores identified" }
          ],
          boundingZones: [
            { x: 30, y: 30, width: 40, height: 35, label: "Late Blight Necrotic Zone (97% conf)" }
          ],
          differentialDiagnoses: [
            { disease: "Potato Late Blight", probability: 95 },
            { disease: "Potato Early Blight", probability: 4 },
            { disease: "Botrytis Blight", probability: 1 }
          ]
        },
        actionPlan: {
          immediate: [
            "Apply an oomycete-specific curative fungicide (Fluopicolide + Propamocarb or Mandipropamid).",
            "Eliminate any infected volunteer potatoes growing in ditch lines."
          ],
          treatment: [
            "Maintain 5-7 day protective spray intervals during cool rainy periods.",
            "Use copper octanoate for certified organic potato production."
          ],
          whatToAvoid: [
            "Do not harvest tubers while foliage remains green and infected to avoid tuber contamination.",
            "Do not wash potatoes prior to curing and storage."
          ],
          monitoring: [
            "Check field daily, focusing on low-lying depressions with standing humidity."
          ],
          followUp: [
            "Re-scan in 3 days; destroy vines 2 weeks prior to harvest if disease is active."
          ]
        },
        prevention: [
          "Always plant certified disease-free seed potatoes.",
          "Hilling soil generously over tuber beds creates a protective barrier against washed-down spores.",
          "Select resistant potato varieties (e.g., Sarpo Mira, Defender)."
        ]
      },
      {
        id: "potato-early-blight",
        name: "Potato Early Blight",
        pathogen: "Alternaria solani",
        status: "Diseased",
        severity: "Moderate",
        defaultConfidence: 90,
        description: "Foliar disease targeting mature potato leaves, characterized by dark angular spots bounded by leaf veins.",
        symptoms: [
          "Dark brown angular to circular spots with concentric rings",
          "Yellowing (senescence) of foliage between lesion zones",
          "Premature defoliation reducing tuber size and dry matter accumulation"
        ],
        causes: [
          "Alternating wet and dry cycles stressing potato canopy",
          "Nutrient stress (low nitrogen or low potassium)",
          "Planting in soil with infected crop residue"
        ],
        explainableAI: {
          primaryReason: "Concentric target ring spots confined by major veins, with chlorotic background senescence.",
          features: [
            { name: "Concentric Target Markings", importance: 91, detected: true, note: "Alternaria ring patterns" },
            { name: "Interveinal Chlorosis", importance: 85, detected: true, note: "Secondary leaf tissue yellowing" }
          ],
          boundingZones: [
            { x: 25, y: 35, width: 30, height: 28, label: "Alternaria Target Spot (92% conf)" }
          ],
          differentialDiagnoses: [
            { disease: "Potato Early Blight", probability: 90 },
            { disease: "Brown Leaf Spot", probability: 7 },
            { disease: "Late Blight", probability: 3 }
          ]
        },
        actionPlan: {
          immediate: [
            "Ensure balanced fertilization, particularly adequate potassium and nitrogen.",
            "Apply protective fungicide (Azoxystrobin or Mancozeb)."
          ],
          treatment: [
            "Foliar bio-fungicide (Bacillus amyloliquefaciens) combined with copper."
          ],
          whatToAvoid: [
            "Avoid drought stress followed by heavy flooding."
          ],
          monitoring: [
            "Inspect middle-tier canopy weekly."
          ],
          followUp: [
            "Re-evaluate leaf health in 5 days."
          ]
        },
        prevention: [
          "Practice 3-year crop rotation with non-solanaceous crops (cereals, legumes).",
          "Ensure uniform irrigation via moisture sensors."
        ]
      },
      {
        id: "potato-healthy",
        name: "Healthy Potato Crop",
        pathogen: "None",
        status: "Healthy",
        severity: "Low",
        defaultConfidence: 97,
        description: "Lush, dark green potato foliage showing vigorous vegetative growth and optimal tuber bulking potential.",
        symptoms: [
          "Broad, uniformly dark green compound leaflets",
          "Absence of brown lesions, yellow speckling, or mosaic patterns",
          "Strong erect haulms (stems) with sturdy petiole structure"
        ],
        causes: [
          "Proper hill mounding and optimal nitrogen/potassium ratio",
          "Consistent soil moisture and healthy soil microbial biodiversity"
        ],
        explainableAI: {
          primaryReason: "Optimum canopy leaf area index (LAI), uniform green reflectance, and intact cellular cuticle.",
          features: [
            { name: "Foliar Homogeneity", importance: 98, detected: true, note: "Clean deep green coloration" },
            { name: "Zero Necrotic Lesions", importance: 99, detected: true, note: "No disease markings detected" }
          ],
          boundingZones: [
            { x: 20, y: 20, width: 60, height: 60, label: "Healthy Potato Foliage (99% conf)" }
          ],
          differentialDiagnoses: [
            { disease: "Healthy Potato", probability: 97 },
            { disease: "Minor Mechanical Abrasion", probability: 3 }
          ]
        },
        actionPlan: {
          immediate: [
            "Maintain scheduled hilling to shield developing tubers from direct sunlight (preventing greening/solanine)."
          ],
          treatment: [
            "No disease treatment required. Continue standard fertigation."
          ],
          whatToAvoid: [
            "Avoid soil compaction around hill beds."
          ],
          monitoring: [
            "Inspect weekly for Colorado potato beetle egg clusters under leaves."
          ],
          followUp: [
            "Scan again during peak tuber bulking phase."
          ]
        },
        prevention: [
          "Maintain proper weed management and drip irrigation."
        ]
      }
    ]
  },
  {
    id: "corn",
    name: "Corn / Maize",
    scientificName: "Zea mays",
    category: "Poaceae / Cereal",
    icon: "🌽",
    description: "Major global cereal crop prone to Northern Corn Leaf Blight, Common Rust, Gray Leaf Spot, and Smut.",
    diseases: [
      {
        id: "corn-northern-leaf-blight",
        name: "Northern Corn Leaf Blight (NCLB)",
        pathogen: "Exserohilum turcicum (Fungus)",
        status: "Diseased",
        severity: "High",
        defaultConfidence: 93,
        description: "Produces long, cigar-shaped grayish-green to tan lesions that can coalesce and burn up the photosynthetic canopy before grain fill.",
        symptoms: [
          "Long elliptical cigar-shaped lesions (2.5 to 15 cm in length)",
          "Gray-green changing to tan or brown as tissue dies",
          "Dark fungal sporulation forming dirty rings within lesions during damp periods",
          "Extensive leaf burning from lower leaves upward towards ear leaf"
        ],
        causes: [
          "Moderate temperatures (18°C - 27°C / 65°F - 80°F) with prolonged 6-12 hr leaf wetness",
          "Conservation tillage leaving infected corn residue on the surface",
          "Susceptible hybrid varieties planted in continuous corn rotations"
        ],
        explainableAI: {
          primaryReason: "Long spindle/cigar-shaped elliptical lesions parallel to leaf veins diagnostic of Exserohilum turcicum.",
          features: [
            { name: "Cigar-Shaped Lesions", importance: 96, detected: true, note: "Long parallel elliptical necrosis" },
            { name: "Interveinal Elongation", importance: 90, detected: true, note: "Lesion growth bounded between major leaf veins" }
          ],
          boundingZones: [
            { x: 20, y: 35, width: 60, height: 25, label: "Cigar-Shaped NCLB Lesion (95% conf)" }
          ],
          differentialDiagnoses: [
            { disease: "Northern Corn Leaf Blight", probability: 93 },
            { disease: "Gray Leaf Spot", probability: 5 },
            { disease: "Goss's Wilt", probability: 2 }
          ]
        },
        actionPlan: {
          immediate: [
            "Assess whether lesions have reached the ear leaf (critical for yield protection during tasseling/silking VT-R2).",
            "Apply foliar triazole or strobilurin fungicide if threshold exceeds 50% ear leaf coverage."
          ],
          treatment: [
            "Fungicides containing Pyraclostrobin + Fluxapyroxad or Azoxystrobin + Propiconazole."
          ],
          whatToAvoid: [
            "Do not delay spraying once lesions appear on the 2 leaves below the primary ear before silking."
          ],
          monitoring: [
            "Scout 20 plants per quadrant focusing on ear-leaf layer."
          ],
          followUp: [
            "Scan in 7 days to evaluate lesion arrest."
          ]
        },
        prevention: [
          "Plant corn hybrids with multi-gene Ht resistance.",
          "Rotate with soybeans, alfalfa, or wheat to break fungal life cycle.",
          "Incorporate or bury corn residue in fields with heavy previous disease history."
        ]
      },
      {
        id: "corn-common-rust",
        name: "Common Corn Rust",
        pathogen: "Puccinia sorghi",
        status: "Diseased",
        severity: "Moderate",
        defaultConfidence: 91,
        description: "Fungal disease producing raised cinnamon-brown pustules on both upper and lower leaf surfaces.",
        symptoms: [
          "Small, oval to elongate powdery rust-brown pustules (uredinia)",
          "Pustules appear on both upper and lower leaf surfaces",
          "Surrounding chlorotic rings and leaf tissue rupture",
          "Pustules turn brownish-black later in season as teliospores develop"
        ],
        causes: [
          "Cool, humid weather (16°C - 23°C / 60°F - 73°F) and high relative humidity (>95%)",
          "Airborne spores transported northward on southern storm fronts"
        ],
        explainableAI: {
          primaryReason: "Bilateral powdery cinnamon-brown pustules bursting through leaf epidermal surface.",
          features: [
            { name: "Raised Rust Pustules", importance: 94, detected: true, note: "Urediniospore clusters rupturing cuticle" },
            { name: "Cinnamon Red Pigmentation", importance: 89, detected: true, note: "Characteristic Puccinia spore color" }
          ],
          boundingZones: [
            { x: 30, y: 30, width: 25, height: 25, label: "Rust Pustule Cluster (92% conf)" },
            { x: 55, y: 45, width: 22, height: 22, label: "Secondary Pustule Zone (89% conf)" }
          ],
          differentialDiagnoses: [
            { disease: "Common Corn Rust", probability: 91 },
            { disease: "Southern Corn Rust", probability: 7 },
            { disease: "Physoderma Brown Spot", probability: 2 }
          ]
        },
        actionPlan: {
          immediate: [
            "Apply foliar fungicide (e.g., Pyraclostrobin, Tebuconazole) if rust pustules are widespread before tasseling on susceptible inbred lines or sweet corn."
          ],
          treatment: [
            "Fungicide treatment with strobilurin/triazole blend."
          ],
          whatToAvoid: [
            "Avoid late plantings that encounter peak airborne spore showers."
          ],
          monitoring: [
            "Scout sweet corn fields twice weekly."
          ],
          followUp: [
            "Re-scan in 5-6 days."
          ]
        },
        prevention: [
          "Plant rust-resistant hybrids featuring Rp1-D resistance genes.",
          "Plant early in the season to avoid peak spore flights."
        ]
      },
      {
        id: "corn-healthy",
        name: "Healthy Corn / Maize Leaf",
        pathogen: "None",
        status: "Healthy",
        severity: "Low",
        defaultConfidence: 99,
        description: "Deep green, robust corn leaves with crisp central midribs, uniform chlorophyll distribution, and no leaf blights or rust spots.",
        symptoms: [
          "Vibrant emerald green leaf lamina with straight, sturdy midrib",
          "Parallel venation intact without stripes, flecks, or necrotic bands",
          "Clean leaf collar and sheath free of smut galls or rot"
        ],
        causes: [
          "Adequate side-dressed nitrogen, phosphorus, and zinc",
          "Timely rainfall/irrigation during vegetative V6-V12 stages"
        ],
        explainableAI: {
          primaryReason: "High chlorophyll density and clean parallel venation with zero necrotic lesion signatures.",
          features: [
            { name: "Parallel Vein Clarity", importance: 97, detected: true, note: "Intact monocot venation" },
            { name: "Absence of Pustules", importance: 99, detected: true, note: "Clean epidermal surface" }
          ],
          boundingZones: [
            { x: 15, y: 20, width: 70, height: 60, label: "Healthy Maize Canopy (99% conf)" }
          ],
          differentialDiagnoses: [
            { disease: "Healthy Corn", probability: 99 },
            { disease: "Minor Nitrogen Imbalance", probability: 1 }
          ]
        },
        actionPlan: {
          immediate: [
            "Maintain nitrogen side-dress schedule and soil moisture heading into pollination (R1)."
          ],
          treatment: [
            "No chemical intervention required."
          ],
          whatToAvoid: [
            "Avoid moisture stress during silking and tasseling."
          ],
          monitoring: [
            "Scout canopy weekly during grain fill."
          ],
          followUp: [
            "Scan during dough and dent stages."
          ]
        },
        prevention: [
          "Maintain soil nutrient balance and weed-free field borders."
        ]
      }
    ]
  },
  {
    id: "rice",
    name: "Rice / Paddy",
    scientificName: "Oryza sativa",
    category: "Poaceae / Wetland Cereal",
    icon: "🌾",
    description: "Primary staple food for half the world's population, vulnerable to Rice Blast, Bacterial Leaf Blight, and Sheath Blight.",
    diseases: [
      {
        id: "rice-blast",
        name: "Rice Blast Disease",
        pathogen: "Magnaporthe oryzae (Fungus)",
        status: "Diseased",
        severity: "Critical",
        defaultConfidence: 96,
        description: "The most destructive disease of rice globally. Causes diamond/spindle-shaped lesions with gray-white centers on leaves and neck rot on panicles.",
        symptoms: [
          "Spindle-shaped (diamond-like) lesions with whitish to gray centers and dark reddish-brown borders",
          "Lesions enlarge and coalesce, causing entire leaf blades to wither",
          "Panicle neck rot causing empty whitish grain heads (chalky grain)",
          "Node rot causing culms to snap easily"
        ],
        causes: [
          "Excessive chemical nitrogen fertilizer application",
          "High relative humidity (>90%) with long dew periods and temperatures of 20°C - 28°C",
          "Low soil moisture (upland or un-flooded paddy conditions)"
        ],
        explainableAI: {
          primaryReason: "Diagnostic diamond spindle lesions with ash-gray necrotic center and brown border matching Magnaporthe oryzae.",
          features: [
            { name: "Diamond Spindle Geometry", importance: 97, detected: true, note: "Sharp tapered lesion ends" },
            { name: "Ash-Gray Necrotic Center", importance: 94, detected: true, note: "Characteristic spore-producing core" }
          ],
          boundingZones: [
            { x: 30, y: 35, width: 40, height: 25, label: "Diamond Spindle Blast Lesion (97% conf)" }
          ],
          differentialDiagnoses: [
            { disease: "Rice Blast (Magnaporthe oryzae)", probability: 96 },
            { disease: "Brown Spot (Bipolaris oryzae)", probability: 3 },
            { disease: "Bacterial Leaf Streak", probability: 1 }
          ]
        },
        actionPlan: {
          immediate: [
            "Immediately apply systemic fungicide (Tricyclazole 75% WP, Isoprothiolane, or Kasugamycin).",
            "Maintain 5-10 cm water depth in paddy to suppress fungal spore germination.",
            "Stop any further top-dressing with nitrogenous fertilizers immediately."
          ],
          treatment: [
            "Spray Tricyclazole at 0.6 g/L or Azoxystrobin + Difenoconazole.",
            "Bio-control: Foliar spray of Pseudomonas fluorescens at 10 g/L."
          ],
          whatToAvoid: [
            "Do NOT drain the paddy dry when blast is active.",
            "Never apply urea or excessive ammonium sulfate during blast outbreaks."
          ],
          monitoring: [
            "Inspect paddy early morning; examine flag leaves and emerging panicle necks."
          ],
          followUp: [
            "Perform follow-up scan in 4 days. Re-apply fungicide at 10-day intervals if panicle emergence is starting."
          ]
        },
        prevention: [
          "Seed treatment with Tricyclazole or Carbendazim before sowing (2g/kg seed).",
          "Adopt split nitrogen application and incorporate potassium and silicon (calcium silicate slag).",
          "Plant blast-resistant rice varieties suited to your agro-climatic zone."
        ]
      },
      {
        id: "rice-bacterial-blight",
        name: "Bacterial Leaf Blight (BLB)",
        pathogen: "Xanthomonas oryzae pv. oryzae",
        status: "Diseased",
        severity: "High",
        defaultConfidence: 92,
        description: "A destructive bacterial vascular disease causing wavy yellow-white stripes along leaf margins and milky bacterial ooze under humidity.",
        symptoms: [
          "Water-soaked stripes starting at leaf tips and margins",
          "Lesions turn yellow to bleach-white with wavy, undulating margins",
          "Milky opaque bacterial exudate droplets visible on young lesions in morning dew",
          "Kresek (wilting and death of entire seedling tillers) in young crops"
        ],
        causes: [
          "Wind-driven typhoons/monsoon rainstorms creating micro-wounds on leaves",
          "High temperatures (25°C - 34°C) combined with high humidity",
          "Excessive nitrogenous fertilization and stagnant deep irrigation water"
        ],
        explainableAI: {
          primaryReason: "Wavy margin water-soaking and terminal bleached necrosis along longitudinal leaf veins.",
          features: [
            { name: "Wavy Margin Necrosis", importance: 95, detected: true, note: "Irregular undulating lesion borders" },
            { name: "Terminal Bleaching", importance: 88, detected: true, note: "Straw-colored leaf tip dieback" }
          ],
          boundingZones: [
            { x: 35, y: 20, width: 30, height: 60, label: "Wavy Bacterial Blight Stripe (93% conf)" }
          ],
          differentialDiagnoses: [
            { disease: "Bacterial Leaf Blight", probability: 92 },
            { disease: "Bacterial Leaf Streak", probability: 6 },
            { disease: "Potassium Deficiency Scorch", probability: 2 }
          ]
        },
        actionPlan: {
          immediate: [
            "Drain excess water from the field for 2-3 days to lower canopy humidity.",
            "Apply bactericide formulation (Streptocycline 100 ppm + Copper Oxychloride 2.5 g/L)."
          ],
          treatment: [
            "Spray Copper Hydroxide or Plantomycin at recommended agronomic doses."
          ],
          whatToAvoid: [
            "Avoid deep stagnant irrigation water; avoid clipping seedling leaf tips during transplanting."
          ],
          monitoring: [
            "Check leaf tips across the field after wind and rain storms."
          ],
          followUp: [
            "Re-scan in 5 days."
          ]
        },
        prevention: [
          "Use BLB-resistant varieties with Xa resistance genes (e.g., IR64, Improved Samba Mahsuri).",
          "Apply balanced N-P-K with extra potassium to strengthen cell walls."
        ]
      },
      {
        id: "rice-healthy",
        name: "Healthy Paddy / Rice Plant",
        pathogen: "None",
        status: "Healthy",
        severity: "Low",
        defaultConfidence: 98,
        description: "Erect, vibrant green tillers with strong photosynthetic canopy and clean leaf sheaths supporting robust panicle development.",
        symptoms: [
          "Uniformly green, erect sword-like flag leaves",
          "Clean leaf sheaths free of brown sclerotia or oval spots",
          "Healthy white root system with clean nodal crowns"
        ],
        causes: [
          "Balanced water regime (alternate wetting and moderate drying)",
          "Optimal silicon and potassium nutrition"
        ],
        explainableAI: {
          primaryReason: "Optimal chlorophyll index, upright leaf architecture, and intact leaf lamina with zero necrotic spots.",
          features: [
            { name: "Erect Leaf Posture", importance: 96, detected: true, note: "Strong cellular turgor" },
            { name: "Zero Spotting", importance: 99, detected: true, note: "No fungal or bacterial lesions" }
          ],
          boundingZones: [
            { x: 20, y: 20, width: 60, height: 60, label: "Healthy Paddy Leaf Blades (99% conf)" }
          ],
          differentialDiagnoses: [
            { disease: "Healthy Paddy", probability: 98 },
            { disease: "Minor Snail Feeding Nibble", probability: 2 }
          ]
        },
        actionPlan: {
          immediate: [
            "Maintain 2-5 cm standing water depth during reproductive heading phase."
          ],
          treatment: [
            "No chemical application required."
          ],
          whatToAvoid: [
            "Avoid letting paddy soil crack dry during panicle initiation."
          ],
          monitoring: [
            "Scout for stem borer dead hearts or brown planthopper at water level."
          ],
          followUp: [
            "Scan again at milk and dough stages."
          ]
        },
        prevention: [
          "Maintain optimal plant spacing (20 x 15 cm) and balanced fertilization."
        ]
      }
    ]
  },
  {
    id: "wheat",
    name: "Wheat",
    scientificName: "Triticum aestivum",
    category: "Poaceae / Winter Cereal",
    icon: "🌾",
    description: "Crucial staple cereal grown worldwide, susceptible to Stripe Rust, Leaf Rust, Powdery Mildew, and Fusarium Head Blight.",
    diseases: [
      {
        id: "wheat-stripe-rust",
        name: "Yellow / Stripe Rust",
        pathogen: "Puccinia striiformis f. sp. tritici",
        status: "Diseased",
        severity: "High",
        defaultConfidence: 95,
        description: "Produces bright yellow-orange pustules arranged in distinct linear stripes along leaf veins, reducing grain yield up to 70%.",
        symptoms: [
          "Bright yellow-orange linear stripes of powdery pustules along leaf veins",
          "Pustules rupture epidermal tissue, spilling bright yellow spores",
          "Leaves dry up and turn brown, resembling drought desiccation",
          "Spikes and glumes can become infected in severe epidemics"
        ],
        causes: [
          "Cool weather (10°C - 15°C / 50°F - 59°F) with high humidity and intermittent rain or morning fog",
          "Wind-transported spores blown from mountainous or early-sown regions"
        ],
        explainableAI: {
          primaryReason: "Parallel yellow pustule stripes aligned precisely with leaf vascular bundles.",
          features: [
            { name: "Linear Stripe Architecture", importance: 98, detected: true, note: "Puccinia striiformis distinctive pattern" },
            { name: "Yellow Spore Exudation", importance: 94, detected: true, note: "Powdery yellow urediniospore mass" }
          ],
          boundingZones: [
            { x: 30, y: 25, width: 40, height: 50, label: "Yellow Stripe Rust Colony (96% conf)" }
          ],
          differentialDiagnoses: [
            { disease: "Wheat Stripe Rust", probability: 95 },
            { disease: "Wheat Leaf Rust", probability: 4 },
            { disease: "Septoria Nodorum Blotch", probability: 1 }
          ]
        },
        actionPlan: {
          immediate: [
            "Spray systemic triazole fungicide (Propiconazole 25% EC @ 1 ml/L or Tebuconazole) without delay.",
            "Flag leaf must be protected to ensure kernel grain weight."
          ],
          treatment: [
            "Apply Propiconazole or Azoxystrobin + Difenoconazole."
          ],
          whatToAvoid: [
            "Do not delay fungicide application if temperatures remain below 18°C with morning fog."
          ],
          monitoring: [
            "Inspect field edges and sheltered depressions where dew persists."
          ],
          followUp: [
            "Perform follow-up scan in 5 days to confirm pustule desiccation."
          ]
        },
        prevention: [
          "Sow stripe-rust resistant wheat cultivars featuring Yr genes (e.g., Yr9, Yr18).",
          "Avoid unapproved late-sown winter wheat."
        ]
      },
      {
        id: "wheat-healthy",
        name: "Healthy Wheat Canopy",
        pathogen: "None",
        status: "Healthy",
        severity: "Low",
        defaultConfidence: 98,
        description: "Uniform emerald green flag leaves and healthy tillers free of rust pustules or powdery mildew mildew.",
        symptoms: [
          "Clean, linear leaves without rust pustules or powdery fungal patches",
          "Strong photosynthetic flag leaf providing energy for developing grain heads",
          "Clean leaf sheaths and sturdy culm"
        ],
        causes: [
          "Adequate basal N-P-K, timely crown root irrigation, and good soil aeration"
        ],
        explainableAI: {
          primaryReason: "High green canopy index and zero stripe or rust spore signatures.",
          features: [
            { name: "Homogeneous Pigmentation", importance: 97, detected: true, note: "Uniform chlorophyll" },
            { name: "Zero Pustules", importance: 99, detected: true, note: "No Puccinia spores detected" }
          ],
          boundingZones: [
            { x: 20, y: 20, width: 60, height: 60, label: "Healthy Wheat Foliage (99% conf)" }
          ],
          differentialDiagnoses: [
            { disease: "Healthy Wheat", probability: 98 },
            { disease: "Mild Frost Tip Burn", probability: 2 }
          ]
        },
        actionPlan: {
          immediate: [
            "Ensure adequate irrigation during boot and grain-filling stages."
          ],
          treatment: [
            "No chemical spray needed."
          ],
          whatToAvoid: [
            "Avoid waterlogging during flowering."
          ],
          monitoring: [
            "Scout flag leaves every 5-7 days."
          ],
          followUp: [
            "Scan again during milking stage."
          ]
        },
        prevention: [
          "Practice crop rotation and use treated certified seed."
        ]
      }
    ]
  },
  {
    id: "pepper",
    name: "Bell Pepper / Chili",
    scientificName: "Capsicum annuum",
    category: "Solanaceae / Capsicum",
    icon: "🫑",
    description: "High-value horticultural crop vulnerable to Bacterial Spot, Anthracnose, Phytophthora Blight, and Mosaic Viruses.",
    diseases: [
      {
        id: "pepper-bacterial-spot",
        name: "Bacterial Leaf Spot",
        pathogen: "Xanthomonas campestris pv. vesicatoria",
        status: "Diseased",
        severity: "Moderate",
        defaultConfidence: 92,
        description: "Produces small water-soaked spots that turn dark brown with greasy margins and yellow halos, leading to severe defoliation and sunburned fruit.",
        symptoms: [
          "Small, circular to irregular dark brown spots with water-soaked halos",
          "Lesions appear raised on leaf undersides and sunken on upper surface",
          "Premature yellowing and extensive defoliation leaving fruit exposed",
          "Raised scab-like rough blisters on pepper fruits"
        ],
        causes: [
          "Warm, humid weather with frequent rain showers (24°C - 30°C)",
          "Overhead sprinkler irrigation splashing bacteria from soil or plant debris",
          "Infected seed lots or transplant seedlings"
        ],
        explainableAI: {
          primaryReason: "Pitted necrotic spots with greasy water-soaked margins and chlorotic diffusion halos matching Xanthomonas.",
          features: [
            { name: "Greasy Water-Soaked Margins", importance: 94, detected: true, note: "Bacterial halo signature" },
            { name: "Sunken Abaxial Scabs", importance: 88, detected: true, note: "Pitted foliar ulcerations" }
          ],
          boundingZones: [
            { x: 35, y: 35, width: 30, height: 30, label: "Bacterial Spot Cluster (93% conf)" }
          ],
          differentialDiagnoses: [
            { disease: "Bacterial Leaf Spot", probability: 92 },
            { disease: "Cercospora Leaf Spot", probability: 5 },
            { disease: "Anthracnose", probability: 3 }
          ]
        },
        actionPlan: {
          immediate: [
            "Apply Copper Hydroxide mixed with Mancozeb (acts synergistically against copper-tolerant strains).",
            "Remove and destroy severely affected leaves and fallen foliage."
          ],
          treatment: [
            "Spray Copper Hydroxide + Mancozeb at 7-10 day intervals.",
            "Organic: Apply Bacillus amyloliquefaciens or Serenade ASO."
          ],
          whatToAvoid: [
            "Do NOT prune or handle pepper plants when leaves are wet with rain or dew.",
            "Avoid overhead irrigation."
          ],
          monitoring: [
            "Check underside of middle leaves weekly."
          ],
          followUp: [
            "Re-scan in 5 days."
          ]
        },
        prevention: [
          "Plant resistant bell pepper hybrids with Bs2 and Bs3 resistance genes.",
          "Treat seeds with hot water (50°C for 25 minutes) before planting.",
          "Use plastic or organic mulch to eliminate soil splashing."
        ]
      },
      {
        id: "pepper-healthy",
        name: "Healthy Bell Pepper / Chili Foliage",
        pathogen: "None",
        status: "Healthy",
        severity: "Low",
        defaultConfidence: 98,
        description: "Glossy, rich dark green leaves with smooth margins, strong branching, and abundant healthy flower buds.",
        symptoms: [
          "Smooth, glossy dark green foliage with intact cuticle",
          "Clean leaf undersides without bacterial water spots or mite webbing",
          "Strong petioles and healthy apical blossom development"
        ],
        causes: [
          "Balanced calcium and potassium availability with steady soil moisture"
        ],
        explainableAI: {
          primaryReason: "High gloss cuticular index, uniform chlorophyll density, and zero foliar spots.",
          features: [
            { name: "Cuticular Uniformity", importance: 97, detected: true, note: "Smooth unmarred leaf surface" },
            { name: "Zero Spotting", importance: 99, detected: true, note: "No bacterial lesions found" }
          ],
          boundingZones: [
            { x: 20, y: 20, width: 60, height: 60, label: "Healthy Pepper Foliage (99% conf)" }
          ],
          differentialDiagnoses: [
            { disease: "Healthy Pepper", probability: 98 },
            { disease: "Minor Sun Glare Reflection", probability: 2 }
          ]
        },
        actionPlan: {
          immediate: [
            "Maintain regular drip fertigation and calcium supplementation."
          ],
          treatment: [
            "No chemical spray required."
          ],
          whatToAvoid: [
            "Avoid moisture fluctuations to prevent blossom end rot."
          ],
          monitoring: [
            "Scout for broad mites and thrips on tender new shoots."
          ],
          followUp: [
            "Scan during fruit set."
          ]
        },
        prevention: [
          "Maintain drip irrigation and reflective mulching."
        ]
      }
    ]
  },
  {
    id: "apple",
    name: "Apple Orchard",
    scientificName: "Malus domestica",
    category: "Rosaceae / Fruit Tree",
    icon: "🍎",
    description: "Perennial deciduous tree fruit susceptible to Apple Scab, Cedar Apple Rust, Powdery Mildew, and Fire Blight.",
    diseases: [
      {
        id: "apple-scab",
        name: "Apple Scab",
        pathogen: "Venturia inaequalis (Fungus)",
        status: "Diseased",
        severity: "High",
        defaultConfidence: 94,
        description: "Causes velvety olive-green to dark brown spots on leaves and fruit, causing severe fruit cracking and leaf defoliation.",
        symptoms: [
          "Olive-green to velvety dull olive-brown circular spots on leaf upper surface",
          "Spots become dark, velvety, and thickened with distorted puckered leaf blades",
          "Dark corky scabs on apple skin leading to deformation and cracking",
          "Premature leaf drop in midsummer weakening tree reserves"
        ],
        causes: [
          "Cool, rainy spring weather with extended leaf wetness (>9 hours at 15°C - 20°C)",
          "Overwintered fungal ascospores in fallen orchard leaf litter"
        ],
        explainableAI: {
          primaryReason: "Olive-brown velvety fungal sporulation patches and foliar puckering characteristic of Venturia inaequalis.",
          features: [
            { name: "Velvety Olive Margins", importance: 95, detected: true, note: "Conidial spore mat on leaf surface" },
            { name: "Tissue Puckering", importance: 89, detected: true, note: "Distortion of leaf lamina under lesion" }
          ],
          boundingZones: [
            { x: 30, y: 30, width: 35, height: 35, label: "Velvety Apple Scab Patch (95% conf)" }
          ],
          differentialDiagnoses: [
            { disease: "Apple Scab", probability: 94 },
            { disease: "Cedar Apple Rust", probability: 4 },
            { disease: "Frogeye Leaf Spot", probability: 2 }
          ]
        },
        actionPlan: {
          immediate: [
            "Apply curative systemic fungicide (Difenoconazole, Myclobutanil, or Cyprodinil) within 48 hours of infection event.",
            "Rake and shred or compost fallen orchard leaves to reduce overwintering inoculum."
          ],
          treatment: [
            "Protective sprays with Captan or Mancozeb before anticipated rain.",
            "Organic: Sulfur or Liquid Copper applied at green tip and pink bud stages."
          ],
          whatToAvoid: [
            "Avoid leaving un-flailed leaf litter under apple tree canopies over winter."
          ],
          monitoring: [
            "Check terminal shoots and young leaves after rain events."
          ],
          followUp: [
            "Re-scan in 7 days."
          ]
        },
        prevention: [
          "Plant scab-resistant cultivars (e.g., Enterprise, Liberty, GoldRush, Pristine).",
          "Prune tree canopy annually to maximize sunlight penetration and rapid air drying.",
          "Spray 5% agricultural urea solution onto orchard leaves just prior to autumn leaf drop to accelerate leaf breakdown."
        ]
      },
      {
        id: "apple-healthy",
        name: "Healthy Apple Foliage",
        pathogen: "None",
        status: "Healthy",
        severity: "Low",
        defaultConfidence: 98,
        description: "Clean, leathery dark green leaves with uniform light underside pubescence, strong spur growth, and healthy fruitlet sizing.",
        symptoms: [
          "Uniform dark green leaves with fine serrations along margins",
          "Clean leaf surface without olive scabs or rust flecks",
          "Robust spur development supporting healthy fruit clusters"
        ],
        causes: [
          "Good canopy aeration, optimal zinc/boron nutrition, and dormant orchard hygiene"
        ],
        explainableAI: {
          primaryReason: "High leaf integrity, crisp serration, and zero scab or rust lesions.",
          features: [
            { name: "Lamina Uniformity", importance: 98, detected: true, note: "Clean deep green foliage" },
            { name: "Zero Scab Lesions", importance: 99, detected: true, note: "No fungal mycelium detected" }
          ],
          boundingZones: [
            { x: 20, y: 20, width: 60, height: 60, label: "Healthy Apple Leaf Lamina (99% conf)" }
          ],
          differentialDiagnoses: [
            { disease: "Healthy Apple", probability: 98 },
            { disease: "Harmless Hail Dent", probability: 2 }
          ]
        },
        actionPlan: {
          immediate: [
            "Maintain orchard canopy pruning and fruit thinning."
          ],
          treatment: [
            "No chemical spray required."
          ],
          whatToAvoid: [
            "Avoid dense overgrown water sprouts in the tree center."
          ],
          monitoring: [
            "Monitor weekly for codling moth and European red mite."
          ],
          followUp: [
            "Scan during fruit sizing stage."
          ]
        },
        prevention: [
          "Maintain dormant oil sprays in late winter to suppress overwintering eggs."
        ]
      }
    ]
  },
  {
    id: "grape",
    name: "Grapevine / Vineyard",
    scientificName: "Vitis vinifera",
    category: "Vitaceae / Vine Fruit",
    icon: "🍇",
    description: "Premium fruit vine prone to Black Rot, Downy Mildew, Powdery Mildew (Oidium), and Esca complex.",
    diseases: [
      {
        id: "grape-black-rot",
        name: "Grape Black Rot",
        pathogen: "Guignardia bidwellii (Fungus)",
        status: "Diseased",
        severity: "High",
        defaultConfidence: 93,
        description: "Produces reddish-brown circular leaf spots with tiny black pycnidia specks, and turns grape berries into shriveled, hard black mummies.",
        symptoms: [
          "Small, circular reddish-brown leaf lesions with dark brown borders",
          "Tiny black pepper-like fruiting specks (pycnidia) arranged in rings inside lesions",
          "Infected grape berries turn soft, rot, and shrivel into wrinkled black mummies within days",
          "Elongated dark sunken lesions on new cane shoots"
        ],
        causes: [
          "Warm, wet weather (20°C - 27°C / 68°F - 80°F) requiring 6-12 hours of continuous vine wetness",
          "Overwintered mummified berries left hanging on trellises or dropped on the vineyard floor"
        ],
        explainableAI: {
          primaryReason: "Reddish-brown circular necrotic spots containing concentric rings of black pycnidial fruiting bodies.",
          features: [
            { name: "Pycnidial Black Specks", importance: 96, detected: true, note: "Pitted fruiting structures inside necrotic center" },
            { name: "Reddish-Brown Margins", importance: 91, detected: true, note: "Distinctive Guignardia border color" }
          ],
          boundingZones: [
            { x: 30, y: 30, width: 35, height: 35, label: "Black Rot Lesion with Pycnidia (94% conf)" }
          ],
          differentialDiagnoses: [
            { disease: "Grape Black Rot", probability: 93 },
            { disease: "Grape Downy Mildew", probability: 5 },
            { disease: "Anthracnose (Bird's Eye)", probability: 2 }
          ]
        },
        actionPlan: {
          immediate: [
            "Hand-remove and destroy all mummified grape clusters and severely blighted leaves.",
            "Apply systemic fungicide (Myclobutanil, Kresoxim-methyl, or Mancozeb)."
          ],
          treatment: [
            "Apply protectant sprays from early bloom through 4 weeks post-bloom.",
            "Organic: Fixed Copper + Sulfur spray combination."
          ],
          whatToAvoid: [
            "Never leave mummified fruit on vines or ground during dormant pruning."
          ],
          monitoring: [
            "Inspect grape clusters and interior leaves weekly."
          ],
          followUp: [
            "Re-scan in 5 days."
          ]
        },
        prevention: [
          "Practice canopy management (leaf pulling and shoot positioning) to allow sunlight and wind to penetrate clusters.",
          "Prune out diseased canes during winter dormant season."
        ]
      },
      {
        id: "grape-healthy",
        name: "Healthy Grapevine Leaf",
        pathogen: "None",
        status: "Healthy",
        severity: "Low",
        defaultConfidence: 99,
        description: "Vibrant palmate grapevine foliage with clear lobed margins, strong vein network, and clean unblemished cluster development.",
        symptoms: [
          "Clean palmate lobed leaves with deep emerald green pigmentation",
          "Intact leaf underside without downy mildew white patches or powdery dusting",
          "Strong shoot tendril growth and clean grape bunch setting"
        ],
        causes: [
          "Open canopy trellis training, optimal potassium and magnesium nutrition"
        ],
        explainableAI: {
          primaryReason: "Optimum canopy leaf area, intact leaf margins, and zero pycnidia or downy mildew spots.",
          features: [
            { name: "Lobe Integrity", importance: 97, detected: true, note: "Clean palmate venation" },
            { name: "Zero Sporulation", importance: 99, detected: true, note: "No fungal mycelium detected" }
          ],
          boundingZones: [
            { x: 20, y: 20, width: 60, height: 60, label: "Healthy Grapevine Leaf (99% conf)" }
          ],
          differentialDiagnoses: [
            { disease: "Healthy Grapevine", probability: 99 },
            { disease: "Minor Leaf Hopper Nymph Nibble", probability: 1 }
          ]
        },
        actionPlan: {
          immediate: [
            "Continue standard trellis canopy maintenance and shoot tucking."
          ],
          treatment: [
            "No disease spray required."
          ],
          whatToAvoid: [
            "Avoid dense unmanaged foliage in the fruiting zone."
          ],
          monitoring: [
            "Scout weekly for grapevine leafhoppers and berry moths."
          ],
          followUp: [
            "Scan again during veraison (berry color change)."
          ]
        },
        prevention: [
          "Maintain optimal vine pruning and balanced soil moisture."
        ]
      }
    ]
  }
];
