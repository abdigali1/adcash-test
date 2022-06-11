import { describe, expect, it, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useFormStore } from "@/stores/form.js";
import { mount } from "@vue/test-utils";
import AdcashTable from "@/components/AdcashTable.vue";
import { createTestingPinia } from "@pinia/testing";

const newRuleTemplate = [
  {
    id: 7,
    targeting_type_id: 4,
    rule: "technology-rev",
  },
  {
    id: 8,
    targeting_type_id: 4,
    rule: "egames",
  },
];

describe("Form Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  it("Initial state", () => {
    const store = useFormStore();

    expect(store.loading).toBe(false);
    expect(store.rulesList).toEqual([]);
    expect(store.typesList).toEqual([]);
    expect(store.typeRules).toEqual([]);
    expect(store.categoryList).toEqual([]);
    expect(store.countryList).toEqual([]);
    expect(store.deviceList).toEqual([]);

    store.loading = true;
    expect(store.loading).toBe(true);
  });
  describe("Getters", () => {
    it("GetTypeNameFromId getter", async () => {
      const store = useFormStore();
      await store.fetchRules();
      await store.fetchTypes();

      expect(store.getTypeNameFromId(1)).toEqual("Category");
      expect(store.getTypeNameFromId(2)).toEqual("Country");
      expect(store.getTypeNameFromId(3)).toEqual("Device");
      expect(store.getTypeNameFromId(4)).toEqual("URL keywords");
    });
    it("GetRuleFromId getter", async () => {
      const store = useFormStore();
      await store.fetchRules();
      await store.fetchTypes();

      expect(store.getRuleFromId(1, "1001, 1002")).toEqual(["1001", "1002"]);
      expect(store.getRuleFromId(2, "2001, 2002")).toEqual(["2001", "2002"]);
      expect(store.getRuleFromId(3, "3001, 3002")).toEqual(["3001", "3002"]);
      expect(store.getRuleFromId(4, "test, test2")).toEqual(["test", "test2"]);
    });
  });
  describe("Actions", () => {
    it("FetchRules action", async () => {
      mount(AdcashTable, {
        global: {
          plugins: [createTestingPinia({ stubActions: false })],
        },
      });
      const store = useFormStore();

      await store.fetchRules();

      expect(store.fetchRules).toHaveBeenCalledTimes(1);
      expect(store.rulesList).not.toEqual([]);
    });
    it("FetchRules action", async () => {
      mount(AdcashTable, {
        global: {
          plugins: [createTestingPinia({ stubActions: false })],
        },
      });
      const store = useFormStore();

      await store.fetchRules();

      expect(store.fetchRules).toHaveBeenCalledTimes(1);
      expect(store.rulesList).not.toEqual([]);
    });
    it("AddRulesSync action", async () => {
      mount(AdcashTable, {
        global: {
          plugins: [createTestingPinia({ stubActions: false })],
        },
      });
      const store = useFormStore();
      await store.fetchRules();
      expect(store.rulesList.length).toEqual(6);

      await store.addRulesSync(newRuleTemplate);

      expect(store.rulesList.length).toEqual(8);
      expect(store.rulesList.length).not.toEqual(9);
      expect(store.addRulesSync).toHaveBeenCalledTimes(1);
    });
    it("DeleteRulesSync action", async () => {
      mount(AdcashTable, {
        global: {
          plugins: [createTestingPinia({ stubActions: false })],
        },
      });
      const store = useFormStore();
      await store.fetchRules();
      expect(store.rulesList.length).toEqual(6);

      await store.deleteRulesSync(1, ["1001"]);

      expect(store.rulesList.length).toEqual(5);
      expect(store.rulesList.length).not.toEqual(6);
      expect(store.deleteRulesSync).toHaveBeenCalledTimes(1);
    });
  });
});
