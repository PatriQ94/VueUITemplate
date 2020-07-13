<template>
  <v-dialog max-width="600px" v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="success" dark v-bind="attrs" v-on="on">
        <v-icon left>add</v-icon>
        <span>Add new car</span>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>Car information</v-card-title>
      <v-card-text>
        <v-form class="px-3" v-model="valid">
          <v-select
            :items="brands"
            v-model="brand"
            @change="model = ''"
            label="Brand"
            solo
            :rules="[rules.required]"
          ></v-select>
          <v-select
            :items="models.filter(f => f.brand == brand)"
            :rules="[rules.required]"
            item-value="model"
            item-text="model"
            v-model="model"
            label="Model"
            solo
          ></v-select>
          <v-text-field v-model="year" :rules="[rules.required]" type="number" label="Year" solo />
          <v-text-field
            v-model="kilometers"
            :rules="[rules.required]"
            type="number"
            label="Kilometers"
            solo
          />
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          class="ma-3"
          color="info"
          :disabled="!valid"
          large
          @click="saveNewCar"
          :loading="saving"
        >
          <span>Save</span>
          <v-icon right>save</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      saving: false,
      dialog: false,
      brand: "",
      model: "",
      year: null,
      kilometers: null,
      brands: ["Volkswagen", "BMW", "Škoda"],
      models: [
        { brand: "Volkswagen", model: "Amarok" },
        { brand: "Volkswagen", model: "Golf" },
        { brand: "Volkswagen", model: "Polo" },
        { brand: "Škoda", model: "Octavia" },
        { brand: "Škoda", model: "Superb" },
        { brand: "BMW", model: "M3" },
        { brand: "BMW", model: "M5" }
      ],
      rules: {
        required: value => !!value || "Required."
      }
    };
  },
  methods: {
    saveNewCar() {
      if (this.valid == false) {
        return;
      }
      this.saving = true;
      setTimeout(() => {
        this.saving = false;
        this.dialog = false;
      }, 2000);
    }
  }
};
</script>

<style>
</style>