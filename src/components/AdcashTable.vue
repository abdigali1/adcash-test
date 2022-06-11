<template>
  <div class="adcash-table">
    <h2 class="adcash-table__title">Saved targeting rules</h2>
    <el-table
      :data="store.rulesList"
      v-loading="store.loading"
      style="width: 100%"
    >
      <el-table-column label="Type" width="200">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span style="margin-left: 10px">
              {{ store.getTypeNameFromId(scope.row.targeting_type_id) }}
            </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Rules">
        <template #default="scope">
          <el-tag
            v-for="(tag, index) in store.getRuleFromId(
              scope.row.targeting_type_id,
              scope.row.rule
            )"
            :key="index"
            style="margin-right: 1rem"
            closable
            @close="handleClose(scope.row, tag)"
          >
            {{ tag.name || tag }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Actions" width="100">
        <template #default="scope">
          <div
            id="delete-btn"
            class="adcash-table__delete-btn"
            @click="openConfirmationModal(scope.row)"
          >
            <img :src="Trashcan" />
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-row justify="end" style="margin-top: 18px">
      <el-button @click="$emit('saveChanges', store.rulesList)">
        Save changes
      </el-button>
    </el-row>
  </div>
</template>

<script setup>
import Trashcan from "@/assets/icons/trashcan.svg";
import "element-plus/es/components/message-box/style/css";
import { ElMessageBox } from "element-plus";
import { useFormStore } from "../stores/form";
import pinia from "../stores";

const store = useFormStore(pinia());

const openConfirmationModal = (row) => {
  ElMessageBox.confirm("Are you sure you want to delete the rule?", "Warning", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type: "warning",
  })
    .then(async () => {
      await store.deleteRules(row);
    })
    .catch(() => {});
};

function handleClose({ id, targeting_type_id }, tag) {
  const row = {
    id,
    targeting_type_id,
    rule: String(tag.id),
  };
  openConfirmationModal(row);
}
</script>

<style lang="scss">
.adcash-table {
  &__title {
    margin-bottom: 20px;
  }
  &__delete-btn {
    width: 100%;
    height: 20px;
    cursor: pointer;
    img {
      height: 100%;
    }
  }
}
</style>
