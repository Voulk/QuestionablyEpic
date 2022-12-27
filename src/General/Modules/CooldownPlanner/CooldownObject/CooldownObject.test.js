import React from "react";
import Cooldowns from "../CooldownObject/CooldownObject";

const cooldownObject = new Cooldowns();

test("replaceName replaces name in roster correctly", () => {
  const arr = [
    {
      name: "Ptolemaios",
      class: "PreservationEvoker",
      name: "Voulk",
      class: "restorationDruid",
    },
  ];
  const originalName = "Ptolemaios";
  const newName = "Alexandros";
  const expected = [
    {
      name: "Alexandros",
      class: "PreservationEvoker",
      name: "Voulk",
      class: "restorationDruid",
    },
  ];
  expect(cooldownObject.replaceName(arr, originalName, newName)).toEqual(expected);
});

test("replaceName replaces name in top-level object and nested objects", () => {
  const arr = [
    {
      "2587": {
        Normal: {
          default: [],
        },
        Heroic: {
          default: [
            {
              bossAbility: 396023,
              time: "00:12",
              name0: "Ptolemaios",
              class0: "PreservationEvoker",
              cooldown0: 363534,
              name1: "Voulk",
              class1: "RestorationDruid",
              cooldown1: 740,
              name2: "Voulwarrior",
              class2: "Warrior",
              cooldown2: 97462,
            },
            {
              bossAbility: 394917,
              time: "00:30",
              name0: "Broccoliz",
              class0: "RestorationDruid",
              cooldown0: 391528,
              name1: "GenericEvoker",
              class1: "PreservationEvoker",
              cooldown1: 363534,
              name2: "Ptolemaios",
              class2: "PreservationEvoker",
              cooldown2: 370537,
            },
          ],
        },
        Mythic: {
          default: [
            {
              bossAbility: 396023,
              time: "00:12",
              name0: "Ptolemaios",
              class0: "PreservationEvoker",
              cooldown0: 363534,
              name1: "Voulk",
              class1: "RestorationDruid",
              cooldown1: 740,
              name2: "Voulwarrior",
              class2: "Warrior",
              cooldown2: 97462,
            },
            {
              bossAbility: 394917,
              time: "00:30",
              name0: "Broccoliz",
              class0: "RestorationDruid",
              cooldown0: 391528,
              name1: "GenericEvoker",
              class1: "PreservationEvoker",
              cooldown1: 363534,
              name2: "Ptolemaios",
              class2: "PreservationEvoker",
              cooldown2: 370537,
            },
          ],
          TestPlan: [
            {
              bossAbility: 396023,
              time: "00:12",
              name0: "Ptolemaios",
              class0: "PreservationEvoker",
              cooldown0: 363534,
              name1: "Voulk",
              class1: "RestorationDruid",
              cooldown1: 740,
              name2: "Voulwarrior",
              class2: "Warrior",
              cooldown2: 97462,
            },
            {
              bossAbility: 394917,
              time: "00:30",
              name0: "Broccoliz",
              class0: "RestorationDruid",
              cooldown0: 391528,
              name1: "GenericEvoker",
              class1: "PreservationEvoker",
              cooldown1: 363534,
              name2: "Ptolemaios",
              class2: "PreservationEvoker",
              cooldown2: 370537,
            },
          ],
        },
      },
      "2590": {
        Normal: {
          default: [],
        },
        Heroic: {
          default: [
            {
              bossAbility: 396023,
              time: "00:12",
              name0: "Ptolemaios",
              class0: "PreservationEvoker",
              cooldown0: 363534,
              name1: "Voulk",
              class1: "RestorationDruid",
              cooldown1: 740,
              name2: "Voulwarrior",
              class2: "Warrior",
              cooldown2: 97462,
            },
            {
              bossAbility: 394917,
              time: "00:30",
              name0: "Broccoliz",
              class0: "RestorationDruid",
              cooldown0: 391528,
              name1: "GenericEvoker",
              class1: "PreservationEvoker",
              cooldown1: 363534,
              name2: "Ptolemaios",
              class2: "PreservationEvoker",
              cooldown2: 370537,
            },
          ],
        },
        Mythic: {
          default: [
            {
              bossAbility: 396023,
              time: "00:12",
              name0: "Ptolemaios",
              class0: "PreservationEvoker",
              cooldown0: 363534,
              name1: "Voulk",
              class1: "RestorationDruid",
              cooldown1: 740,
              name2: "Voulwarrior",
              class2: "Warrior",
              cooldown2: 97462,
            },
            {
              bossAbility: 394917,
              time: "00:30",
              name0: "Broccoliz",
              class0: "RestorationDruid",
              cooldown0: 391528,
              name1: "GenericEvoker",
              class1: "PreservationEvoker",
              cooldown1: 363534,
              name2: "Ptolemaios",
              class2: "PreservationEvoker",
              cooldown2: 370537,
            },
          ],
        },
      },
    },
  ];
  const originalName = "Ptolemaios";
  const newName = "Alexandros";
  const expected = [
    {
      "2587": {
        Normal: {
          default: [],
        },
        Heroic: {
          default: [
            {
              bossAbility: 396023,
              time: "00:12",
              name0: "Alexandros",
              class0: "PreservationEvoker",
              cooldown0: 363534,
              name1: "Voulk",
              class1: "RestorationDruid",
              cooldown1: 740,
              name2: "Voulwarrior",
              class2: "Warrior",
              cooldown2: 97462,
            },
            {
              bossAbility: 394917,
              time: "00:30",
              name0: "Broccoliz",
              class0: "RestorationDruid",
              cooldown0: 391528,
              name1: "GenericEvoker",
              class1: "PreservationEvoker",
              cooldown1: 363534,
              name2: "Alexandros",
              class2: "PreservationEvoker",
              cooldown2: 370537,
            },
          ],
        },
        Mythic: {
          default: [
            {
              bossAbility: 396023,
              time: "00:12",
              name0: "Alexandros",
              class0: "PreservationEvoker",
              cooldown0: 363534,
              name1: "Voulk",
              class1: "RestorationDruid",
              cooldown1: 740,
              name2: "Voulwarrior",
              class2: "Warrior",
              cooldown2: 97462,
            },
            {
              bossAbility: 394917,
              time: "00:30",
              name0: "Broccoliz",
              class0: "RestorationDruid",
              cooldown0: 391528,
              name1: "GenericEvoker",
              class1: "PreservationEvoker",
              cooldown1: 363534,
              name2: "Alexandros",
              class2: "PreservationEvoker",
              cooldown2: 370537,
            },
          ],
          TestPlan: [
            {
              bossAbility: 396023,
              time: "00:12",
              name0: "Alexandros",
              class0: "PreservationEvoker",
              cooldown0: 363534,
              name1: "Voulk",
              class1: "RestorationDruid",
              cooldown1: 740,
              name2: "Voulwarrior",
              class2: "Warrior",
              cooldown2: 97462,
            },
            {
              bossAbility: 394917,
              time: "00:30",
              name0: "Broccoliz",
              class0: "RestorationDruid",
              cooldown0: 391528,
              name1: "GenericEvoker",
              class1: "PreservationEvoker",
              cooldown1: 363534,
              name2: "Alexandros",
              class2: "PreservationEvoker",
              cooldown2: 370537,
            },
          ],
        },
      },
      "2590": {
        Normal: {
          default: [],
        },
        Heroic: {
          default: [
            {
              bossAbility: 396023,
              time: "00:12",
              name0: "Alexandros",
              class0: "PreservationEvoker",
              cooldown0: 363534,
              name1: "Voulk",
              class1: "RestorationDruid",
              cooldown1: 740,
              name2: "Voulwarrior",
              class2: "Warrior",
              cooldown2: 97462,
            },
            {
              bossAbility: 394917,
              time: "00:30",
              name0: "Broccoliz",
              class0: "RestorationDruid",
              cooldown0: 391528,
              name1: "GenericEvoker",
              class1: "PreservationEvoker",
              cooldown1: 363534,
              name2: "Alexandros",
              class2: "PreservationEvoker",
              cooldown2: 370537,
            },
          ],
        },
        Mythic: {
          default: [
            {
              bossAbility: 396023,
              time: "00:12",
              name0: "Alexandros",
              class0: "PreservationEvoker",
              cooldown0: 363534,
              name1: "Voulk",
              class1: "RestorationDruid",
              cooldown1: 740,
              name2: "Voulwarrior",
              class2: "Warrior",
              cooldown2: 97462,
            },
            {
              bossAbility: 394917,
              time: "00:30",
              name0: "Broccoliz",
              class0: "RestorationDruid",
              cooldown0: 391528,
              name1: "GenericEvoker",
              class1: "PreservationEvoker",
              cooldown1: 363534,
              name2: "Alexandros",
              class2: "PreservationEvoker",
              cooldown2: 370537,
            },
          ],
        },
      },
    },
  ];

  expect(cooldownObject.replaceName(arr, originalName, newName)).toEqual(expected);
});
