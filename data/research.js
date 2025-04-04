import { TypedObjectField } from "./modelHelpers";

export class Researches extends foundry.abstract.DataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    return {
      events: new TypedObjectField(new fields.EmbeddedDataField(Research)),
    }
  }
}

export class Research extends foundry.abstract.DataModel {
    static defineSchema() {
      const fields = foundry.data.fields;
      return {
        id: new fields.StringField({ required: true }),
        name: new fields.StringField({ required: true }),
        version: new fields.StringField({ required: true }),
        background: new fields.StringField({ required: true }),
        premise: new fields.HTMLField({ required: true, initial: "" }),
        tags: new fields.ArrayField(new fields.StringField(), { required: true, initial: [] }),
        hidden: new fields.BooleanField({ initial: true }),
        timeLimit: new fields.SchemaField({
          unit: new fields.StringField(),
          current: new fields.NumberField({ initial: 0 }),
          max: new fields.NumberField(),
        }),
        started: new fields.BooleanField({ required: true, initial: false }),
        researchPoints: new fields.NumberField({ required: true, initial: 0 }),
        researchChecks: new TypedObjectField(new fields.EmbeddedDataField(ResearchChecks)),
        researchBreakpoints: new TypedObjectField(new fields.SchemaField({
          id: new fields.StringField({ required: true }),
          hidden: new fields.BooleanField({ required: true, initial: true }),
          breakpoint: new fields.NumberField({ requird: true, initial: 5 }),
          description: new fields.HTMLField(),
        })),
        researchEvents: new TypedObjectField(new fields.SchemaField({
          id: new fields.StringField({ required: true }),
          name: new fields.StringField({ required: true, initial: "New Research Event" }),
          hidden: new fields.BooleanField({ required: true, initial: true }),
          timing: new fields.StringField(),
          description: new fields.HTMLField(),
        })),
      }
    }
}

class ResearchChecks extends foundry.abstract.DataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    return {
      id: new fields.StringField({ required: true }),
      name: new fields.StringField({ required: true, initial: "New Check" }),
      hidden: new fields.BooleanField({ required: true, initial: true }),
      description: new fields.HTMLField(),
      maximumResearchPoints: new fields.NumberField({ required: true, initial: 5 }),
      skillChecks: new TypedObjectField(new fields.SchemaField({
        id: new fields.StringField({ required: true }),
        hidden: new fields.BooleanField({ required: true, initial: true }),
        description: new fields.HTMLField(),
        skills: new TypedObjectField(new fields.SchemaField({
          id: new fields.StringField({ required: true }),
          skill: new fields.StringField(),
          action: new fields.StringField(),
          lore: new fields.BooleanField({ required: true, initial: false }),
          dc: new fields.NumberField({ required: true, initial: 10 }),
          basic: new fields.BooleanField({ required: true, initial: false }),
        })),
      }))
    }
  }
}