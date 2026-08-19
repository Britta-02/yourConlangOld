const appData = {
  languages: {
    language1: {
      id: "language1",
      name: "Language A",

      languageData: {
        grammaticalProperties: {
          partsOfSpeech: {
            verb: {
              id: "verb",
              name: "Verb",
            },

            auxiliary: {
              id: "auxiliary",
              name: "Auxiliary",
            },

            conjunction: {
              id: "conjunction",
              name: "Conjunction",
            },

            noun: {
              id: "noun",
              name: "Noun",
            },

            adposition: {
              id: "adposition",
              name: "Adposition",
            },

            adjective: {
              id: "adjective",
              name: "Adjective",
            },

            demonstrative: {
              id: "demonstrative",
              name: "Demonstrative",
            },

            possessor: {
              id: "possessor",
              name: "Possessor",
            },

            numeral: {
              id: "numeral",
              name: "Numeral",
            },

            relativeClause: {
              id: "relativeClause",
              name: "Relative clause",
            },

            genitive: {
              id: "genitive",
              name: "Genitive",
            },

            article: {
              id: "article",
              name: "Article",
            },

            adverb: {
              id: "adverb",
              name: "Adverb",
            },
          },

          sentenceTypes: {
            declarative: {
              id: "declarative",
              name: "Declarative",
            },

            yesNoQuestion: {
              id: "yesNoQuestion",
              name: "Yes/no questions",
            },

            whQuestion: {
              id: "whQuestion",
              name: "Wh- questions",
            },

            negative: {
              id: "negative",
              name: "Negative",
            },
          },
        },

        dictionary: {
          words: {
            word1: {
              id: wo - 1,
              forms: {
                stage1: {
                  spelling: "",
                  script: "",
                },
                stage2: {
                  spelling: "",
                  script: "",
                },
              },
            },
          },
        },

        sentenceDictionary: {
          sentences: {},
        },

        evolution: {
          abbreviations: {},
          rules: {},
        },
      },

      stages: {
        stage1: {
          id: "stage1",
          name: "Modern",

          parentStageId: null,
          childStageId: "stage2",

          data: {
            phonology: {
              phonemes: {
                consonants: [],
                vowels: [],
                minimalPairs: {},
              },

              syllables: {
                onsetState: null,
                codaState: null,

                syllableExceptions: {
                  onsetInitial: {
                    enabled: false,
                    phonemes: [],
                  },

                  onsetGeneral: {
                    enabled: false,
                    phonemes: [],
                  },

                  nucleusInitial: {
                    enabled: false,
                    phonemes: [],
                  },

                  nucleusGeneral: {
                    enabled: false,
                    phonemes: [],
                  },

                  nucleusFinal: {
                    enabled: false,
                    phonemes: [],
                  },

                  codaGeneral: {
                    enabled: false,
                    phonemes: [],
                  },

                  codaFinal: {
                    enabled: false,
                    phonemes: [],
                  },
                },

                phonemeExceptions: {
                  rules: {},
                },
              },

              intonations: {
                enabled: false,

                types: {},
              },
              stress: {},
              tone: {},
            },

            syntax: {
              clauses: {},
              wordOrders: {},
            },

            grammar: {
              parts: {},
              features: {},
              strategies: {},
            },

            origin: {
              type: "original",
              ruleId: null,
            },
          },
        },

        stage2: {
          id: "stage2",
          name: "Proto",

          parentStageId: "stage1",
          childStageId: null,

          data: {
            phonology: {
              phonemes: {
                consonants: [],
                vowels: [],
                minimalPairs: {},
              },

              syllables: {
                onsetState: null,
                codaState: null,

                syllableExceptions: {
                  onsetInitial: {
                    enabled: false,
                    phonemes: [],
                  },

                  onsetGeneral: {
                    enabled: false,
                    phonemes: [],
                  },

                  nucleusInitial: {
                    enabled: false,
                    phonemes: [],
                  },

                  nucleusGeneral: {
                    enabled: false,
                    phonemes: [],
                  },

                  nucleusFinal: {
                    enabled: false,
                    phonemes: [],
                  },

                  codaGeneral: {
                    enabled: false,
                    phonemes: [],
                  },

                  codaFinal: {
                    enabled: false,
                    phonemes: [],
                  },
                },

                phonemeExceptions: {
                  rules: {},
                },
              },

              intonations: {
                enabled: false,

                types: {},
              },
              stress: {},
              tone: {},
            },

            syntax: {
              clauses: {},
              wordOrders: {},
            },

            grammar: {
              parts: {},
              features: {},
              strategies: {},
            },

            origin: {
              type: "original",
              ruleId: null,
            },
          },
        },
      },
    },

    language2: {
      id: "language2",
      name: "Language B",

      languageData: {
        grammaticalProperties: {
          partsOfSpeech: {
            verb: {
              id: "verb",
              name: "Verb",
            },

            auxiliary: {
              id: "auxiliary",
              name: "Auxiliary",
            },

            conjunction: {
              id: "conjunction",
              name: "Conjunction",
            },

            noun: {
              id: "noun",
              name: "Noun",
            },

            adposition: {
              id: "adposition",
              name: "Adposition",
            },

            adjective: {
              id: "adjective",
              name: "Adjective",
            },

            demonstrative: {
              id: "demonstrative",
              name: "Demonstrative",
            },

            possessor: {
              id: "possessor",
              name: "Possessor",
            },

            numeral: {
              id: "numeral",
              name: "Numeral",
            },

            relativeClause: {
              id: "relativeClause",
              name: "Relative clause",
            },

            genitive: {
              id: "genitive",
              name: "Genitive",
            },

            article: {
              id: "article",
              name: "Article",
            },

            adverb: {
              id: "adverb",
              name: "Adverb",
            },
          },

          sentenceTypes: {
            declarative: {
              id: "declarative",
              name: "Declarative",
            },

            yesNoQuestion: {
              id: "yesNoQuestion",
              name: "Yesno questions",
            },

            whQuestion: {
              id: "whQuestion",
              name: "Wh- questions",
            },

            negative: {
              id: "negative",
              name: "Negative",
            },
          },
        },

        dictionary: {
          words: {
            word1: {
              id: wo - 1,
              forms: {
                stage1: {
                  spelling: "",
                  script: "",
                },
                stage2: {
                  spelling: "",
                  script: "",
                },
              },
            },
          },
        },

        sentenceDictionary: {
          sentences: {},
        },

        evolution: {
          abbreviations: {},
          rules: {},
        },
      },

      stages: {
        stage1: {
          id: "stage1",
          name: "Modern",

          parentStageId: null,
          childStageId: null,

          data: {
            phonology: {
              phonemes: {
                consonants: [],
                vowels: [],
                minimalPairs: {},
              },

              syllables: {
                onsetState: null,
                codaState: null,

                syllableExceptions: {
                  onsetInitial: {
                    enabled: false,
                    phonemes: [],
                  },

                  onsetGeneral: {
                    enabled: false,
                    phonemes: [],
                  },

                  nucleusInitial: {
                    enabled: false,
                    phonemes: [],
                  },

                  nucleusGeneral: {
                    enabled: false,
                    phonemes: [],
                  },

                  nucleusFinal: {
                    enabled: false,
                    phonemes: [],
                  },

                  codaGeneral: {
                    enabled: false,
                    phonemes: [],
                  },

                  codaFinal: {
                    enabled: false,
                    phonemes: [],
                  },
                },

                phonemeExceptions: {
                  rules: {},
                },
              },

              intonations: {
                enabled: false,

                types: {},
              },
              stress: {},
              tone: {},
            },

            syntax: {
              clauses: {},
              wordOrders: {},
            },

            grammar: {
              parts: {},
              features: {},
              strategies: {},
            },

            origin: {
              type: "original",
              ruleId: null,
            },
          },
        },
      },
    },
  },
};

window.appData = appData;
