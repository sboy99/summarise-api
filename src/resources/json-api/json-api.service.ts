import { BadRequestException, Injectable } from '@nestjs/common';
import { Axios } from 'axios';

@Injectable()
export class JsonApiService {
  private axios: Axios;

  constructor() {
    this.axios = new Axios({
      baseURL: 'https://dev4.buidl.so/jsonapi/node',
      maxBodyLength: Infinity,
      headers: {
        format: 'api_json',
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }

  async getStartupUpdates(startupReferenceId: string) {
    try {
      const uri = `/startup_updates?fields[node--startup_updates]=title,created,field_body,field_startup_update_date,field_update_morale,title,created,field_updates_fundraising_only,field_asks_in_updates,field_updates_mentoring_only,field_updates_pivot_only,field_updates_product_only,field_updates_questions_only,field_updates_traction_only,field_updates_vouches_only&sort=created&filter[field_referenced_profile.id]=${startupReferenceId}`;
      const { data } = await this.axios.get(uri);
      return JSON.parse(data);
    } catch (error) {
      throw new BadRequestException(error.response.data.message);
    }
  }
}
