export const INITIAL_DIAGNOSES = [
  {
    id: "scan-hist-001",
    crop: "Tomato",
    scientificName: "Solanum lycopersicum",
    cropIcon: "🍅",
    condition: "Early Blight",
    pathogen: "Alternaria solani (Fungus)",
    status: "Diseased",
    severity: "Moderate",
    confidence: 94,
    imageUrl: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=800&q=80",
    symptoms: [
      "Brown circular lesions with concentric ring patterns (bullseye target)",
      "Chlorosis (yellow halo) surrounding dark necrotic spots",
      "Lower canopy leaf drop and stem lesions near soil level"
    ],
    causes: [
      "Prolonged leaf wetness and high humidity (>80%)",
      "Warm temperatures between 24°C - 29°C (75°F - 85°F)",
      "Overhead sprinkler irrigation splashing soil spores onto lower leaves"
    ],
    explainableAI: {
      primaryReason: "Concentric target-like ring lesions and chlorotic halos detected on foliage with 94% visual pattern match to Alternaria solani.",
      features: [
        { name: "Concentric Ring Lesions", importance: 92, detected: true, note: "Target-board circular necrosis characteristic of Alternaria" },
        { name: "Chlorotic Margin Halo", importance: 88, detected: true, note: "Yellow zone indicating toxin diffusion around necrotic tissue" },
        { name: "Lower Canopy Distribution", importance: 84, detected: true, note: "Older leaf colonization pattern consistent with early blight" }
      ],
      boundingZones: [
        { x: 28, y: 35, width: 24, height: 26, label: "Bullseye Target Lesion (96% conf)" },
        { x: 58, y: 48, width: 20, height: 22, label: "Chlorotic Halo Zone (91% conf)" }
      ],
      differentialDiagnoses: [
        { disease: "Early Blight (Alternaria solani)", probability: 94 },
        { disease: "Septoria Leaf Spot", probability: 4 },
        { disease: "Bacterial Spot", probability: 2 }
      ]
    },
    actionPlan: {
      immediate: [
        "Prune off heavily infected lower leaves using sanitized shears and dispose of them away from the field.",
        "Disinfect pruning tools with 70% alcohol."
      ],
      treatment: [
        "Apply Liquid Copper Fungicide or Bacillus subtilis bio-spray every 7-10 days.",
        "Apply early morning for fast drying."
      ],
      whatToAvoid: [
        "Avoid overhead sprinkler irrigation; always use drip hoses.",
        "Do NOT work in tomato rows while foliage is wet."
      ],
      monitoring: [
        "Scout adjacent rows within a 10-meter radius every 48 hours for new spots."
      ],
      followUp: [
        "Take a follow-up scan in 4 to 5 days to confirm lesion stabilization."
      ]
    },
    prevention: [
      "Practice 3-year crop rotation avoiding other Solanaceae.",
      "Ensure wide plant spacing (60-90 cm) for air flow.",
      "Apply organic straw mulch immediately to prevent soil splash."
    ],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(), // 6 hours ago
    notes: "Detected in North Greenhouse Row 4. Treatment started."
  },
  {
    id: "scan-hist-002",
    crop: "Corn / Maize",
    scientificName: "Zea mays",
    cropIcon: "🌽",
    condition: "Common Corn Rust",
    pathogen: "Puccinia sorghi",
    status: "Diseased",
    severity: "Moderate",
    confidence: 91,
    imageUrl: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80",
    symptoms: [
      "Small, oval to elongate powdery rust-brown pustules",
      "Pustules appear on both upper and lower leaf surfaces",
      "Surrounding chlorotic rings and leaf tissue rupture"
    ],
    causes: [
      "Cool, humid weather (16°C - 23°C / 60°F - 73°F)",
      "Airborne spores transported on storm fronts"
    ],
    explainableAI: {
      primaryReason: "Bilateral powdery cinnamon-brown pustules bursting through leaf epidermal surface.",
      features: [
        { name: "Raised Rust Pustules", importance: 94, detected: true, note: "Urediniospore clusters rupturing cuticle" },
        { name: "Cinnamon Red Pigmentation", importance: 89, detected: true, note: "Characteristic Puccinia spore color" }
      ],
      boundingZones: [
        { x: 30, y: 30, width: 25, height: 25, label: "Rust Pustule Cluster (92% conf)" }
      ],
      differentialDiagnoses: [
        { disease: "Common Corn Rust", probability: 91 },
        { disease: "Southern Corn Rust", probability: 7 },
        { disease: "Physoderma Brown Spot", probability: 2 }
      ]
    },
    actionPlan: {
      immediate: [
        "Apply foliar fungicide if rust pustules spread before tasseling."
      ],
      treatment: [
        "Fungicide treatment with strobilurin/triazole blend."
      ],
      whatToAvoid: [
        "Avoid late plantings encountering peak spore showers."
      ],
      monitoring: [
        "Scout sweet corn fields twice weekly."
      ],
      followUp: [
        "Re-scan in 5-6 days."
      ]
    },
    prevention: [
      "Plant rust-resistant hybrids with Rp1-D resistance genes."
    ],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    notes: "Field East Block B. Monitored for silking."
  },
  {
    id: "scan-hist-003",
    crop: "Rice / Paddy",
    scientificName: "Oryza sativa",
    cropIcon: "🌾",
    condition: "Rice Blast Disease",
    pathogen: "Magnaporthe oryzae (Fungus)",
    status: "Diseased",
    severity: "Critical",
    confidence: 96,
    imageUrl: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
    symptoms: [
      "Spindle-shaped (diamond-like) lesions with whitish to gray centers and dark reddish-brown borders",
      "Lesions coalesce, causing entire leaf blades to wither",
      "Panicle neck rot risk"
    ],
    causes: [
      "Excessive chemical nitrogen fertilizer application",
      "High relative humidity (>90%) with long dew periods",
      "Low soil moisture (un-flooded conditions)"
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
        { disease: "Rice Blast", probability: 96 },
        { disease: "Brown Spot", probability: 3 },
        { disease: "Bacterial Leaf Streak", probability: 1 }
      ]
    },
    actionPlan: {
      immediate: [
        "Apply systemic fungicide (Tricyclazole 75% WP or Kasugamycin).",
        "Maintain 5-10 cm standing water in paddy.",
        "Halt nitrogen top-dressing immediately."
      ],
      treatment: [
        "Spray Tricyclazole at 0.6 g/L or Azoxystrobin + Difenoconazole."
      ],
      whatToAvoid: [
        "Do NOT drain paddy dry during active blast."
      ],
      monitoring: [
        "Inspect early morning flag leaves daily."
      ],
      followUp: [
        "Perform scan in 4 days."
      ]
    },
    prevention: [
      "Seed treatment with Tricyclazole before sowing.",
      "Apply silicon and potassium to strengthen culms."
    ],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    notes: "Paddy sector 2. Tricyclazole applied."
  },
  {
    id: "scan-hist-004",
    crop: "Potato",
    scientificName: "Solanum tuberosum",
    cropIcon: "🥔",
    condition: "Healthy Potato Crop",
    pathogen: "None",
    status: "Healthy",
    severity: "Low",
    confidence: 97,
    imageUrl: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80",
    symptoms: [
      "Broad, uniformly dark green compound leaflets",
      "Absence of brown lesions, yellow speckling, or mosaic patterns",
      "Strong erect haulms with sturdy petiole structure"
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
        "Maintain scheduled hilling to shield developing tubers from sunlight."
      ],
      treatment: [
        "No disease treatment required."
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
    ],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), // 3 days ago
    notes: "Plot 7 looking very healthy."
  },
  {
    id: "scan-hist-005",
    crop: "Apple Orchard",
    scientificName: "Malus domestica",
    cropIcon: "🍎",
    condition: "Apple Scab",
    pathogen: "Venturia inaequalis (Fungus)",
    status: "Diseased",
    severity: "High",
    confidence: 94,
    imageUrl: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80",
    symptoms: [
      "Olive-green to velvety dull olive-brown circular spots on leaf upper surface",
      "Spots become dark, velvety, and thickened with distorted puckered leaf blades",
      "Dark corky scabs on apple skin"
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
        "Apply curative systemic fungicide (Difenoconazole or Myclobutanil).",
        "Rake and shred fallen orchard leaves."
      ],
      treatment: [
        "Protective sprays with Captan or Mancozeb before rains."
      ],
      whatToAvoid: [
        "Avoid leaving un-flailed leaf litter under apple tree canopies."
      ],
      monitoring: [
        "Check terminal shoots after rain events."
      ],
      followUp: [
        "Re-scan in 7 days."
      ]
    },
    prevention: [
      "Prune canopy annually for sunlight penetration.",
      "Plant scab-resistant cultivars."
    ],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(), // 4 days ago
    notes: "South Orchard Row 12."
  }
];
