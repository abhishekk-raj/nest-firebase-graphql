import * as admin from 'firebase-admin';
import { Injectable } from '@nestjs/common';

import * as config from '../config/dayscount-firebase-adminsdk.json';
import { getFirestore } from 'firebase-admin/firestore';

@Injectable()
export class FirebaseService {
  private admin: admin.app.App;

  public init(): void {
    this.admin = admin.initializeApp({
      credential: admin.credential.cert({
        projectId: config.project_id,
        privateKey: config.private_key,
        clientEmail: config.client_email,
      }),
    });

    const db = getFirestore();
    db.settings({ ignoreUndefinedProperties: true });
  }
}
