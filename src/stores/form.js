import { defineStore } from "pinia";
import { api } from "../api";
import { exceptionHandler } from "../api/handlers";

export const useFormStore = defineStore("form", {
  state: () => ({
    loading: false,
    rulesList: [],
    typesList: [],
    typeRules: [],
    categoryList: [],
    countryList: [],
    deviceList: [],
  }),
  getters: {
    getTypeNameFromId: (state) => (id) => {
      if (!id || !state.typesList.length) return;
      return state.typesList.find((el) => el.id === id).name;
    },
    getRuleFromId: (state) => (typeId, rule) => {
      if (!rule) return;

      const rules = rule.split(", ");

      if (typeId === 1 && state.categoryList.length)
        return rules.map((id) =>
          state.categoryList.find((item) => item.id === parseInt(id))
        );
      else if (typeId === 2 && state.countryList.length)
        return rules.map((id) =>
          state.countryList.find((item) => item.id === parseInt(id))
        );
      else if (typeId === 3 && state.deviceList.length)
        return rules.map((id) =>
          state.deviceList.find((item) => item.id === parseInt(id))
        );
      else return rules;
    },
  },
  actions: {
    async fetchRules() {
      this.loading = true;
      try {
        const response = await api.get("/rules");
        this.rulesList = response.data;

        return response.data;
      } catch (error) {
        exceptionHandler(error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async fetchTypes() {
      this.loading = true;
      try {
        const response = await api.get("/types");
        this.typesList = response.data;

        return response.data;
      } catch (error) {
        exceptionHandler(error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async fetchCategories() {
      this.loading = true;
      try {
        const response = await api.get("/categories");
        this.categoryList = response.data;

        return response.data;
      } catch (error) {
        exceptionHandler(error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async fetchCountries() {
      this.loading = true;
      try {
        const response = await api.get("/countries");
        this.countryList = response.data;

        return response.data;
      } catch (error) {
        exceptionHandler(error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async fetchDevices() {
      this.loading = true;
      try {
        const response = await api.get("/devices");
        this.deviceList = response.data;

        return response.data;
      } catch (error) {
        exceptionHandler(error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async deleteRules({ id, targeting_type_id, rule }) {
      this.loading = true;
      const rules = rule.split(", ");
      try {
        const response = await api.delete("/rules", {
          targeting_type_id,
          rules: [...rules],
        });

        this.deleteRulesSync(id, rules);

        return response.data;
      } catch (error) {
        exceptionHandler(error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async addRules({ type, rules }) {
      this.loading = true;
      try {
        const response = await api.post("/rules", {
          targeting_type_id: type,
          rules: rules,
        });

        this.addRulesSync(response.data.rules);

        return response.data;
      } catch (error) {
        exceptionHandler(error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
    addRulesSync(rules) {
      const length = this.rulesList.length + 1;
      const formattedRules = rules.map((el, index) => ({
        ...el,
        id: length + index,
      }));
      this.rulesList.push(...formattedRules);
    },
    deleteRulesSync(id, rules) {
      const index = this.rulesList.findIndex((el) => el.id === id);

      const currentRules = this.rulesList
        .find((el) => el.id === id)
        .rule.split(", ");

      const newRule = currentRules.filter((el) => {
        if (rules.includes(el)) return false;
        else return true;
      });

      this.rulesList[index].rule = newRule.join(", ");

      if (!this.rulesList[index].rule.length) this.rulesList.splice(index, 1);
    },
  },
});
