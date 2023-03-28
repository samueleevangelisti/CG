var graphicUtils = {
  AccordionItem: class {
    static fromConfigObj(configObj) {
      let itemId = configObj.itemId;
      if(!itemId) {
        throw 'itemId is undefined';
      }
      return new graphicUtils.AccordionItem(elementFromConfigObj({
        tag: 'div',
        classArr: [
          'accordion-item'
        ],
        childElementArr: [
          elementFromConfigObj({
            tag: 'h2',
            classArr: [
              'accordion-header'
            ],
            childElementArr: [
              elementFromConfigObj({
                tag: 'button',
                type: 'button',
                innerHTML: itemId,
                classArr: [
                  'accordion-button',
                  'collapsed'
                ],
                attributeObj: {
                  'data-bs-toggle': 'collapse',
                  'data-bs-target': `#${itemId}-accordion-collapse`
                }
              })
            ]
          }),
          elementFromConfigObj({
            tag: 'div',
            id: `${itemId}-accordion-collapse`,
            classArr: [
              'accordion-collapse',
              'collapse'
            ],
            attributeObj: {
              'data-bs-parent': '#item-accordion'
            },
            childElementArr: [
              elementFromConfigObj({
                tag: 'div',
                classArr: [
                  'accordion-body'
                ],
                childElementArr: [
                  elementFromConfigObj({
                    tag: 'table',
                    classArr: [
                      'table'
                    ],
                    childElementArr: [
                      elementFromConfigObj({
                        tag: 'thead',
                        childElementArr: [
                          elementFromConfigObj({
                            tag: 'tr',
                            childElementArr: [
                              elementFromConfigObj({
                                tag: 'th',
                                scope: 'col',
                                styleObj: {
                                  width: '1%'
                                }
                              }),
                              elementFromConfigObj({
                                tag: 'th',
                                scope: 'col'
                              })
                            ]
                          })
                        ]
                      }),
                      elementFromConfigObj({
                        tag: 'tbody',
                        childElementArr: [
                          elementFromConfigObj({
                            tag: 'tr',
                            childElementArr: [
                              elementFromConfigObj({
                                tag: 'td',
                                innerHTML: 'y rotation',
                                classArr: [
                                  'text-nowrap',
                                  'p-1'
                                ]
                              }),
                              elementFromConfigObj({
                                tag: 'td',
                                classArr: [
                                  'text-nowrap',
                                  'p-1'
                                ],
                                childElementArr: [
                                  elementFromConfigObj({
                                    tag: 'input',
                                    id: `${itemId}-y-rotation-input`,
                                    type: 'number',
                                    name: `${itemId}-yRotation`,
                                    step: '0.01',
                                    classArr: [
                                      'form-control',
                                      'p-1'
                                    ],
                                    handlerFnObj: {
                                      'change': globalsInputOnChange
                                    }
                                  })
                                ]
                              })
                            ]
                          }),
                          elementFromConfigObj({
                            tag: 'tr',
                            childElementArr: [
                              elementFromConfigObj({
                                tag: 'td',
                                innerHTML: 'z rotation',
                                classArr: [
                                  'text-nowrap',
                                  'p-1'
                                ]
                              }),
                              elementFromConfigObj({
                                tag: 'td',
                                classArr: [
                                  'text-nowrap',
                                  'p-1'
                                ],
                                childElementArr: [
                                  elementFromConfigObj({
                                    tag: 'input',
                                    id: `${itemId}-z-rotation-input`,
                                    type: 'number',
                                    name: `${itemId}-zRotation`,
                                    step: '0.01',
                                    classArr: [
                                      'form-control',
                                      'p-1'
                                    ],
                                    handlerFnObj: {
                                      'change': globalsInputOnChange
                                    }
                                  })
                                ]
                              })
                            ]
                          }),
                          elementFromConfigObj({
                            tag: 'tr',
                            childElementArr: [
                              elementFromConfigObj({
                                tag: 'td',
                                innerHTML: 'x rotation',
                                classArr: [
                                  'text-nowrap',
                                  'p-1'
                                ]
                              }),
                              elementFromConfigObj({
                                tag: 'td',
                                classArr: [
                                  'text-nowrap',
                                  'p-1'
                                ],
                                childElementArr: [
                                  elementFromConfigObj({
                                    tag: 'input',
                                    id: `${itemId}-x-rotation-input`,
                                    type: 'number',
                                    name: `${itemId}-xRotation`,
                                    step: '0.01',
                                    classArr: [
                                      'form-control',
                                      'p-1'
                                    ],
                                    handlerFnObj: {
                                      'change': globalsInputOnChange
                                    }
                                  })
                                ]
                              })
                            ]
                          })
                        ]
                      })
                    ]
                  })
                ]
              })
            ]
          })
        ]
      }));
    }

    constructor(element) {
      this.element = element;
    }
  }
};
